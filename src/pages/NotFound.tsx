import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import TransitionLink from "../components/TransitionLink";

export default function NotFound() {
  return (
    <div className="flex min-h-[60svh] flex-col justify-center">
      <PageHeader eyebrow={<span>Error · 404</span>} title="Route not found.">
        <p>This path doesn't exist. It might've moved, or never did.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <TransitionLink to="/" className="btn btn-solid">
            <ArrowLeft size={14} aria-hidden="true" />
            Home
          </TransitionLink>
          <TransitionLink to="/work" className="btn btn-outline">
            View work
            <ArrowRight size={14} aria-hidden="true" />
          </TransitionLink>
        </div>
      </PageHeader>
    </div>
  );
}
