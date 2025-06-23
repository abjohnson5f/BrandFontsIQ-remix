import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/lib/utils";

interface Tab {
  name: string;
  href: string;
}

interface ThoughtSpotTabsProps {
  tabs: Tab[];
}

export function ThoughtSpotTabs({ tabs }: ThoughtSpotTabsProps) {
  const location = useLocation();
  
  return (
    <div className="border-b border-[hsl(var(--ts-border))]">
      <div className="px-6">
        <nav className="flex gap-6">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href || 
                           location.pathname.startsWith(tab.href + '/');
            
            return (
              <Link
                key={tab.href}
                to={tab.href}
                className={cn(
                  "ts-tab",
                  isActive && "active"
                )}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}