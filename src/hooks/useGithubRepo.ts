import { useEffect, useState } from "react";

type RepoData = {
  stars: number;
  pushedAt: string | null;
};

const cache = new Map<string, RepoData>();

function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)\/?$/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

export function useGithubRepo(url: string): RepoData | null {
  const [data, setData] = useState<RepoData | null>(() => cache.get(url) ?? null);

  useEffect(() => {
    if (cache.has(url)) {
      setData(cache.get(url)!);
      return;
    }
    const parsed = parseGithubUrl(url);
    if (!parsed) return;

    let cancelled = false;
    fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled || !json) return;
        const result: RepoData = {
          stars: typeof json.stargazers_count === "number" ? json.stargazers_count : 0,
          pushedAt: json.pushed_at ?? null,
        };
        cache.set(url, result);
        setData(result);
      })
      .catch(() => {
        /* GitHub API unreachable or rate-limited — degrade silently, no stat shown */
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return data;
}

export function formatRelativeDate(iso: string | null): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}
