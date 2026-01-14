import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Advanced single-page marketing site (React + TS + Tailwind)
 * - Data-driven sections
 * - Dark mode persisted in localStorage
 * - Mobile menu
 * - Scroll-spy active links
 * - Accessible navigation & buttons
 */

type NavItem = { id: SectionId; label: string };
type SectionId = "rooms" | "menu" | "packages" | "contact";

type RoomRate = {
  name: string;
  capacity: string;
  happyHour: string;
  primeTime: string;
  highlight?: boolean;
};

type MenuItem = {
  title: string;
  desc: string;
  price: string;
  imageUrl: string;
};

type PackageItem = {
  badge?: string;
  icon: "music_note" | "star" | "diamond";
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
};

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initial: localStorage -> system preference
    const stored = localStorage.getItem("gm:theme");
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;

    const initialDark = stored ? stored === "dark" : prefersDark;
    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("gm:theme", next ? "dark" : "light");
      return next;
    });
  };

  return { isDark, toggle };
}

function useScrollSpy(sectionIds: SectionId[], offsetPx = 120) {
  const [active, setActive] = useState<SectionId>("rooms");

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + offsetPx;

      let current: SectionId = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (top <= y) current = id;
      }
      setActive(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [sectionIds, offsetPx]);

  return active;
}

function scrollToId(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const IMAGE = {
  hero:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCem7NOTzX3dsRgf5xfPNIxEwl8rnV2h4segaa5s7DLb5CrBn_6qIEzD_p6K18HVqms4KwczPELKcNEIIMIzPd0zpIpVIGPsm6iKxKwcvAEx9NTdm655IW4aGHRo-28OQs9YP4mUexKlnKLRdJlbMOxyOftM6umvzNigClrhuhBlJBikoT4tHZWS9y4DZ4oKnyYjEM5Y29N-Wyo7LKQTeOAyrmftObntHLnpwbwR35NaTOky2KPs__FyD-G3HOs6uyyY5YXCjjqpJ2h",
  emblem:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCrQc578fv6n_ctMUuy0JgkSEziu9ZEP5y6JGC1hH5t1c6DYR6bpl2cmZ0RTqZX0yxcxmiU8Nf_KBI1lFa05R5XDKrnjd4_lDMre-O_q7zS55PMRNd972WL9YCsMLarxfYLZRgPkS-Pqm1EY-tAoYztLNz2BKXkbtq5m0U-ltBypdU819nLu083HoHY-ZzsG2r3JQIbPGx6rtBXjSNkbzquY1zYFP5_trcXzKdSexGbucHZsxBwu14Qm_m6BViisFbipmmAMDfP0Piz",
  room1:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBW_Orkp6qgtw44PwMzDL9b6zB3h9-yZPt5bVoJymlJSrMDdB8Nb_dGuQAD4xXswi4E4MMHKVPuKatv3lziirgrmmuy-QyhPSj83FamNxdDxGkqA40yw671uz_zKU9fq2UB8X1Qkn-59415Agcks9g7crSB47_p8P1ZWYznA0Mo7YIp9xj9r4Em6IbkN5Ur3xoULh-QwmBfHYDtv8LhGae6ZDOK1Sb43kik9vxIJ-V-nhoQhHZwUFu8oT-qZEDDCrCxs5ZXBadq4a1S",
  room2:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCYZr1c7KzR4Qar0ekfuVIxsslouhBv30Pav4nCnuwp1XOIaYd57APx7tSde-Agbn1Ag5fSaIMpGYngBgCC3Xk-1DpAvsPgdo4FCqO-xNZXB1XPiM5w1j4Hjo8X6dGqdrQm-nzHDP2FtmMV574Hi-4wOecOVnCZEwx5XTUo6PaqxUQDAFZT5s0SHZnheSKpM_fptXhgsqxVUtz6Bv2ZrC10Mcmme2ZHOwnoInf40kRn7jvZ9OJBHjozqiBMb_JR8UTxTsjdGIXKctPl",
  menuBg:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAK0TAszp7Ln6He0SoiLgnikoNP2rVVywNSuzrAg4G8UQi2AqbfC2vLQaYpFgAjl32Ez2FpoYNdGnLQnE6lDPR-YjqTy9__eTmZNIed_DzYiyr-k1wgSCZUm6Ij1m4_jsf17xyyYEjt7MJV3RmY7-1Zq-YVpCnLJK664N-T_Xz53-ckpca0Hov6FyifrSzUpxeyLrt51KMCvfCS0Qi3k4oP1-x21Oq0sRYZ0mZyfq_cYptj-4Lwxwm9tbUEln7ZVYTYpMOYnC2SdauC",
};

export default function App() {
  const nav: NavItem[] = useMemo(
    () => [
      { id: "rooms", label: "Өрөө & Үнийн мэдээлэл" },
      { id: "menu", label: "Хоол & Коктейль" },
      { id: "packages", label: "VIP Багцууд" },
      { id: "contact", label: "Захиалга" },
    ],
    []
  );

  const roomRates: RoomRate[] = useMemo(
    () => [
      {
        name: "Соната",
        capacity: "1–4 хүн",
        happyHour: "$35/цаг",
        primeTime: "$55/цаг",
      },
      {
        name: "Хармони",
        capacity: "5–8 хүн",
        happyHour: "$55/цаг",
        primeTime: "$85/цаг",
      },
      {
        name: "Симфони",
        capacity: "9–15 хүн",
        happyHour: "$85/цаг",
        primeTime: "$125/цаг",
      },
      {
        name: "Grand Royal VIP",
        capacity: "16–30 хүн",
        happyHour: "$150/цаг",
        primeTime: "$250/цаг",
        highlight: true,
      },
    ],
    []
  );

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        title: "Royal Blue коктейль",
        desc: "Жин, Blue Curaçao, алтлаг нунтаг, нимбэг",
        price: "$18",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBDf1xsy06B4ECI3d_miKvg5StOnHokDZ4vUnCIZpYCeg1XUQ3VF3u4gCk4Bh59clktlkRpizs3zcLQ71_W1ciEcEychBpzMHpRIL3RNsQmUz4VbC_VcKjcvSMto3jwIQgH0GK7LlwFe0uCkrSVzsLKqTI3lz7R64wd1sQ9201UjmCkYc8YXtG2mbfsUrGlcBuoPlxYncV1F7oDjokcTOFNhs5PW1yaWtBffEtQtP9sLYsSgGTZYsmQnpx8UG8JYBVSssRiadBI2uUN",
      },
      {
        title: "Wagyu Slider",
        desc: "Трюфль aioli, brioche талх, aged cheddar",
        price: "$24",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDq370T-pvv5Zd8f6UI7LgTZBsjUMXIF2OKF4Sl27BEGYvb9I-UdDKIn_9SPJGr0F8wcnE2P4SQjvVuywGKCAbvl8xFGHc8gaNJl3Y5lrEWk4SlZQKEKagLM2mJykQ2cgXwcp9xOkYsIU-XmkLQbUDlp6eseLxdiotcOqGYXvLXavIqsg8tDLntOeQAqu1R48Vey49TxLYpwI3Lhmb8yBsx2pvSaoIa1ZfP91mWUcFUwYrsBZrOek_spSnug1Oxrl7VLGcbQCvOnueY",
      },
      {
        title: "Dom Pérignon",
        desc: "Vintage 2012, Brut",
        price: "$450",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDpH7c-uMZPzcdEK9vrAQRXXnJ-kJ0XfvC8rgnBiMyz7_hMSfT2eqa2rcxT0G-VpdNz3w6za7_9J53bT15hlu-JJo61Lk90eOPCOfDZeDrwf7Jj-smqmeAt2TyxsHpDB5Xvj_JJMhkl3cyVaJ5mb8RkHTCxbR9qRLDsSG-XQelPj5NYeZlpOzvXT-FRLFPj5Ib4RIDkVgzdudSfCbvFQ-Xe2QSWTCKyoWpFpSlrGucwlApxE2M-25xCIgA5HJfcqhtWhDGC08_EhEgY",
      },
    ],
    []
  );

  const packages: PackageItem[] = useMemo(
    () => [
      {
        icon: "music_note",
        title: "Silver Chord",
        price: "$399",
        features: [
          "3 цагийн өрөө (Дунд)",
          "House спирт 1 шил",
          "Party platter 2",
          "Ундааны mixer",
        ],
      },
      {
        badge: "Хамгийн их сонголт",
        icon: "star",
        title: "Golden Melody",
        price: "$699",
        features: [
          "4 цагийн өрөө (Том)",
          "Premium спирт 1 шил",
          "Шампанск 1 шил",
          "Gourmet platter 4",
          "Жимсний таваг",
        ],
        featured: true,
      },
      {
        icon: "diamond",
        title: "Platinum Prestige",
        price: "$1,200",
        features: [
          "Шөнийн турш өрөө (VIP)",
          "Top-shelf спирт 2 шил",
          "Vintage шампанск 2 шил",
          "Хувийн Butler үйлчилгээ",
          "Меню tasting (хязгааргүй)",
        ],
      },
    ],
    []
  );

  const { isDark, toggle } = useDarkMode();
  const active = useScrollSpy(["rooms", "menu", "packages", "contact"], 140);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [navElevated, setNavElevated] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onScroll = () => setNavElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on resize
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onSubscribe = () => {
    const email = emailRef.current?.value?.trim();
    if (!email) {
      alert("Имэйл хаягаа оруулна уу.");
      emailRef.current?.focus();
      return;
    }
    // placeholder behavior (wire to backend later)
    alert("Баярлалаа! Танд шинэ санал, эвентүүдийг илгээх болно. 🎶");
    if (emailRef.current) emailRef.current.value = "";
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-body text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* NAV */}
      <header className="fixed top-0 z-50 w-full">
        <nav
          className={cn(
            "border-b border-primary/30 backdrop-blur-md transition-all",
            navElevated
              ? "bg-white/90 dark:bg-[#0d1b4e]/95 shadow-lg"
              : "bg-white/70 dark:bg-[#0d1b4e]/80"
          )}
          aria-label="Үндсэн навигаци"
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              className="group flex flex-col items-start"
              onClick={() => scrollToId("rooms")}
              aria-label="Нүүр хэсэг рүү очих"
              type="button"
            >
              <span className="font-display text-xl font-bold tracking-widest text-primary">
                GRAND MELODY
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gray-600 dark:text-gray-400">
                VIP Karaoke
              </span>
              <span className="mt-1 h-[2px] w-0 bg-primary transition-all group-hover:w-full" />
            </button>

            {/* Desktop nav */}
            <div className="hidden items-center gap-8 md:flex">
              {nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  type="button"
                  className={cn(
                    "font-display text-xs uppercase tracking-wider transition-colors",
                    active === item.id
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary dark:text-gray-200"
                  )}
                  aria-current={active === item.id ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => scrollToId("contact")}
                type="button"
                className="px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-[#0d1b4e] transition-all duration-300 font-display text-xs uppercase tracking-wider"
              >
                Одоо захиалах
              </button>

              <button
                onClick={toggle}
                type="button"
                className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                aria-label={isDark ? "Light mode" : "Dark mode"}
              >
                <span className="material-icons text-primary text-xl">
                  {isDark ? "light_mode" : "dark_mode"}
                </span>
              </button>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggle}
                type="button"
                className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                aria-label={isDark ? "Light mode" : "Dark mode"}
              >
                <span className="material-icons text-primary text-2xl">
                  {isDark ? "light_mode" : "dark_mode"}
                </span>
              </button>

              <button
                onClick={() => setMobileOpen((p) => !p)}
                type="button"
                className="rounded-md p-2 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={mobileOpen}
                aria-label="Цэс нээх"
              >
                <span className="material-icons text-3xl text-gray-800 dark:text-white">
                  {mobileOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile panel */}
          <div
            id="mobile-menu"
            className={cn(
              "md:hidden overflow-hidden border-t border-primary/20 bg-white/95 dark:bg-[#0d1b4e]/95 transition-all",
              mobileOpen ? "max-h-96" : "max-h-0"
            )}
          >
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="flex flex-col gap-2">
                {nav.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToId(item.id);
                      setMobileOpen(false);
                    }}
                    type="button"
                    className={cn(
                      "rounded-md px-3 py-3 text-left font-display text-xs uppercase tracking-wider transition-colors",
                      active === item.id
                        ? "bg-primary/10 text-primary"
                        : "text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    scrollToId("contact");
                    setMobileOpen(false);
                  }}
                  type="button"
                  className="mt-2 w-full rounded-md bg-primary px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-[#0d1b4e] hover:bg-white transition-colors"
                >
                  Одоо захиалах
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative h-screen overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={IMAGE.hero}
            alt="Тансаг karaoke lounge интерьер"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b4e]/80 via-[#0d1b4e]/60 to-[#0d1b4e] dark:from-black/70 dark:via-[#0d1b4e]/80 dark:to-background-dark" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center">
          <img
            src={IMAGE.emblem}
            alt="Grand Melody эмблем"
            className="mb-6 h-28 md:h-44 drop-shadow-2xl opacity-90 brightness-110"
            loading="lazy"
          />

          <h1 className="font-display text-4xl font-bold tracking-wide text-white drop-shadow-lg md:text-6xl lg:text-7xl">
            <span className="block text-gold-gradient">Тайз бол чинийх</span>
          </h1>

          <p className="mt-6 max-w-2xl font-serif text-lg italic tracking-wide text-gray-200 md:text-2xl">
            Дээд зэрэглэлийн entertainment + fine dining — нэг дор.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <button
              onClick={() => scrollToId("rooms")}
              type="button"
              className="px-8 py-4 bg-primary text-[#0d1b4e] font-display font-bold tracking-widest uppercase hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.5)]"
            >
              Өрөөнүүдийг харах
            </button>
            <button
              onClick={() => scrollToId("menu")}
              type="button"
              className="px-8 py-4 bg-transparent border border-white text-white font-display font-bold tracking-widest uppercase hover:bg-white hover:text-[#0d1b4e] transition-all duration-300"
            >
              Меню үзэх
            </button>
          </div>

          <button
            onClick={() => scrollToId("rooms")}
            type="button"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
            aria-label="Доош гүйлгэх"
          >
            <span className="material-icons text-primary text-4xl">
              keyboard_arrow_down
            </span>
          </button>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative bg-surface-light py-20 dark:bg-surface-dark">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-4 block text-sm font-display uppercase tracking-[0.2em] text-primary">
            GRAND MELODY-д тавтай морил
          </span>
          <h2 className="mb-8 font-serif text-3xl leading-tight text-gray-900 dark:text-white md:text-5xl">
            Мелоди ба <span className="italic text-primary">урлаг</span> нэг дор
          </h2>
          <p className="text-lg font-light leading-relaxed text-gray-600 dark:text-gray-300">
            Энгийнээс тасарч, дуу авиа ба амтны “премиум” ертөнцөд ор. Манай VIP
            өрөөнүүд акустик инженерчлэлтэй, харин тогооч нар чинь тайзан дээр
            “гэрэлтэх” энергийг чинь гастрономигоор цэнэглэнэ.
          </p>
          <div className="mt-12 flex justify-center">
            <div className="h-1 w-24 bg-primary" />
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="bg-background-light py-24 dark:bg-background-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl text-gray-900 dark:text-white">
              Хувийн өрөө & Үнэ
            </h2>
            <p className="mt-3 font-serif italic text-gray-600 dark:text-gray-400">
              Дотно, акустик, тухтай — яг таны хүмүүст.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={IMAGE.room1}
                alt="VIP жижиг өрөө"
                className="h-64 w-full translate-y-4 rounded-lg object-cover shadow-lg"
                loading="lazy"
              />
              <img
                src={IMAGE.room2}
                alt="Том party өрөө"
                className="h-64 w-full -translate-y-4 rounded-lg object-cover shadow-lg"
                loading="lazy"
              />
            </div>

            <div className="relative border border-gray-200 bg-white p-8 shadow-2xl dark:border-primary/20 dark:bg-surface-dark md:p-12">
              <div className="absolute -mr-2 -mt-2 right-0 top-0 h-20 w-20 border-r-4 border-t-4 border-primary opacity-50" />
              <div className="absolute -mb-2 -ml-2 bottom-0 left-0 h-20 w-20 border-b-4 border-l-4 border-primary opacity-50" />

              <h3 className="mb-8 text-center font-display text-2xl uppercase tracking-widest text-gray-900 dark:text-white">
                Цагийн тариф
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <th className="pb-4 font-display text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Өрөө
                      </th>
                      <th className="pb-4 font-display text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Багтаамж
                      </th>
                      <th className="pb-4 text-right font-display text-xs uppercase tracking-wider text-primary">
                        Happy Hour <br />
                        <span className="text-[10px] normal-case opacity-70">
                          (20:00-с өмнө)
                        </span>
                      </th>
                      <th className="pb-4 text-right font-display text-xs uppercase tracking-wider text-primary">
                        Prime Time <br />
                        <span className="text-[10px] normal-case opacity-70">
                          (20:00-с хойш)
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="font-serif text-gray-700 dark:text-gray-200">
                    {roomRates.map((r) => (
                      <tr
                        key={r.name}
                        className={cn(
                          "border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/5",
                          r.highlight && "bg-primary/5"
                        )}
                      >
                        <td className={cn("py-6 font-bold", r.highlight && "text-primary")}>
                          {r.name}
                        </td>
                        <td className="py-6">{r.capacity}</td>
                        <td className="py-6 text-right">{r.happyHour}</td>
                        <td className={cn("py-6 text-right font-bold", r.highlight && "text-primary")}>
                          {r.primeTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-6 text-center text-xs font-light italic text-gray-400">
                * Амралтын өдөр Prime Time захиалга: хамгийн багадаа 2 цаг.
              </p>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="px-6 py-3 bg-primary text-[#0d1b4e] font-display font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Захиалгын хүсэлт илгээх
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="relative overflow-hidden bg-surface-light py-24 dark:bg-surface-dark">
        <div
          className="pointer-events-none absolute inset-0 opacity-5 dark:opacity-10"
          style={{ backgroundImage: `url('${IMAGE.menuBg}')` }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-primary font-display font-bold tracking-widest text-sm uppercase">
              Гастрономи
            </span>
            <h2 className="mt-2 mb-4 font-display text-4xl text-gray-900 dark:text-white">
              Gourmet bites & Signature cocktails
            </h2>
            <div className="mx-auto h-0.5 w-24 bg-primary" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <article
                key={item.title}
                className="group relative cursor-pointer overflow-hidden rounded-sm"
                aria-label={item.title}
              >
                <div className="h-96">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="mb-1 font-display text-2xl text-white">
                    {item.title}
                  </h3>
                  <p className="mb-2 font-serif text-sm italic text-gray-300">
                    {item.desc}
                  </p>
                  <span className="font-bold text-primary">{item.price}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => alert("Эндээс бүтэн меню рүү линк хийж болно.")}
              className="inline-flex items-center border-b border-primary pb-1 font-display text-sm uppercase tracking-widest text-primary transition-colors hover:border-white hover:text-white"
            >
              Бүтэн меню үзэх
              <span className="material-icons ml-2 text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="bg-background-light py-24 dark:bg-background-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl text-gray-900 dark:text-white">
              Баярын багцууд
            </h2>
            <p className="mt-3 font-serif italic text-gray-600 dark:text-gray-400">
              Таны онцгой үдэшлэгт зориулсан бэлэн туршлага.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.title}
                className={cn(
                  "relative border p-8 text-center transition-all duration-300",
                  p.featured
                    ? "bg-[#0d1b4e] dark:bg-black/40 border-primary shadow-2xl scale-105 z-10"
                    : "bg-white dark:bg-surface-dark border-gray-200 dark:border-primary/20 hover:shadow-2xl hover:border-primary hover:-translate-y-2"
                )}
              >
                {p.badge && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-primary px-4 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-[#0d1b4e]">
                    {p.badge}
                  </div>
                )}

                <div
                  className={cn(
                    "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full",
                    p.featured ? "bg-primary/20 text-primary" : "bg-gray-100 dark:bg-background-dark text-primary"
                  )}
                >
                  <span className="material-icons text-3xl">{p.icon}</span>
                </div>

                <h3
                  className={cn(
                    "mb-2 font-display text-xl font-bold",
                    p.featured ? "text-white" : "text-gray-900 dark:text-white"
                  )}
                >
                  {p.title}
                </h3>

                <div className={cn("mb-6 font-serif", p.featured ? "text-4xl text-primary" : "text-3xl text-primary")}>
                  {p.price}
                </div>

                <ul className={cn("mb-8 space-y-4 text-left text-sm font-light", p.featured ? "text-gray-300" : "text-gray-600 dark:text-gray-300")}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start">
                      <span className="material-icons mr-2 mt-1 text-sm text-primary">
                        check_circle
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className={cn(
                    "w-full py-3 font-display text-sm uppercase tracking-wider transition-colors",
                    p.featured
                      ? "bg-primary text-[#0d1b4e] font-bold hover:bg-white"
                      : "border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-primary hover:border-primary hover:text-white"
                  )}
                >
                  Сонгох
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="border-t border-primary/30 bg-surface-dark pt-20 pb-10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="mb-4 block font-display text-2xl font-bold tracking-widest text-primary">
                GRAND MELODY
              </span>
              <p className="font-serif text-sm italic leading-relaxed text-gray-400">
                Караокегийн туршлагыг дээд түвшинд — тансаг, хувийн, төгс үйлчилгээтэй.
              </p>
            </div>

            <div>
              <h4 className="mb-6 font-display text-lg text-primary">Ажиллах цаг</h4>
              <ul className="space-y-2 text-sm font-light text-gray-300">
                <li className="flex justify-between">
                  <span>Даваа – Пүрэв:</span> <span>17:00 – 02:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Баасан – Бямба:</span> <span>16:00 – 04:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Ням:</span> <span>16:00 – 02:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-display text-lg text-primary">Холбоо барих</h4>
              <ul className="space-y-3 text-sm font-light text-gray-300">
                <li className="flex items-center">
                  <span className="material-icons mr-3 text-sm text-primary">location_on</span>
                  123 Symphony Blvd, Music City
                </li>
                <li className="flex items-center">
                  <span className="material-icons mr-3 text-sm text-primary">phone</span>
                  (555) 123-4567
                </li>
                <li className="flex items-center">
                  <span className="material-icons mr-3 text-sm text-primary">email</span>
                  vip@grandmelody.com
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-display text-lg text-primary">Клубт нэгдэх</h4>
              <p className="mb-4 text-xs text-gray-400">
                Онцгой санал, эвентүүдийг түрүүлж аваарай.
              </p>
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubscribe();
                }}
              >
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Имэйл хаяг"
                  className="rounded-none border border-gray-600 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
                  aria-label="Имэйл"
                />
                <button
                  type="submit"
                  className="bg-primary px-4 py-2 font-display text-sm font-bold uppercase text-[#0d1b4e] transition-colors hover:bg-white"
                >
                  Бүртгүүлэх
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-xs text-gray-500">
              © 2023 Grand Melody VIP Karaoke. Бүх эрх хуулиар хамгаалагдсан.
            </p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                className="text-gray-400 transition-colors hover:text-primary"
                onClick={() => alert("Facebook линк энд байрлана.")}
                aria-label="Facebook"
              >
                <span className="material-icons text-sm">facebook</span>
              </button>
              <button
                type="button"
                className="text-gray-400 transition-colors hover:text-primary"
                onClick={() => alert("Instagram линк энд байрлана.")}
                aria-label="Instagram"
              >
                Instagram
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * NOTE:
 * - Ensure you have Google Fonts + Material Icons loaded in index.html (or Next layout)
 * - Tailwind config should include your custom colors/fonts (see below)
 * - Add .text-gold-gradient and scrollbar CSS in index.css (see below)
 */
