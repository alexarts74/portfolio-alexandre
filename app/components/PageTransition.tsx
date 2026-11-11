"use client";

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type AnchorHTMLAttributes,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { gsap } from "@/app/lib/gsap";

type TransitionContextType = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const isAnimating = useRef(false);

  // When the route changes: slide the overlay out (upward)
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.55,
      delay: 0.05,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(overlay, { yPercent: 100 });
        isAnimating.current = false;
      },
    });
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      // No transition if already on the target page
      if (href === pathname) return;
      if (isAnimating.current) return;
      isAnimating.current = true;

      const overlay = overlayRef.current;
      if (!overlay) {
        router.push(href);
        return;
      }

      // Slide overlay up from bottom to cover screen
      gsap.set(overlay, { yPercent: 100 });
      gsap.to(overlay, {
        yPercent: 0,
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(href);
        },
      });
    },
    [router, pathname]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9997] bg-black pointer-events-none"
        style={{ transform: "translateY(100%)" }}
        aria-hidden
      />
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  ref?: React.Ref<HTMLAnchorElement>;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "ref">;

export function TransitionLink({
  href,
  children,
  onClick,
  ref,
  ...props
}: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    navigate(href);
  };

  return (
    <Link href={href} onClick={handleClick} ref={ref} {...(props as object)}>
      {children}
    </Link>
  );
}
