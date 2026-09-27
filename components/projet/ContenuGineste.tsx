"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { asset } from "@/lib/asset";

const dossier = "/images/projets/domaine-de-la-gineste";
const videos = "/videos/domaine-de-la-gineste";

const triptyque = [
  { src: `${dossier}/04.webp`, alt: "Déchargement du raisin pendant les vendanges" },
  { src: `${dossier}/01.webp`, alt: "Machine à vendanger et tracteur au Domaine" },
  { src: `${dossier}/05.webp`, alt: "Machine à vendanger dans les vignes au coucher du soleil" },
];

const bouteilles = [
  { src: `${dossier}/03.webp`, alt: "Bouteilles du Domaine devant la façade" },
  { src: `${dossier}/02.webp`, alt: "Bouteilles du Domaine sous la treille" },
];

// Photos qui cèdent la place à leur reel au survol (ou au toucher).
const reels = [
  {
    photo: `${dossier}/06.webp`,
    video: `${videos}/reels-1.mp4`,
    alt: "Moissonneuse dans les blés au coucher du soleil",
  },
  {
    photo: `${dossier}/07.webp`,
    video: `${videos}/reels-2.mp4`,
    alt: "Machine à vendanger entre les rangs de vigne",
  },
];

/** Mise en page spécifique de la page Domaine de la Gineste. */
export function ContenuGineste() {
  return (
    <>
      <Bandeau
        src={`${dossier}/bandeau.webp`}
        alt="Vendanges au soleil couchant, Domaine de la Gineste"
        position="50% 70%"
      />

      <div className="gutter py-10 max-md:px-6 md:py-24">
        <div className="grid grid-cols-3 gap-2 md:gap-6 xl:gap-9">
          {triptyque.map((photo) => (
            <Photo key={photo.src} {...photo} ratio={2 / 3} sizes="(max-width: 768px) 33vw, 600px" />
          ))}
        </div>
      </div>

      <div className="relative h-[180px] w-full overflow-hidden md:h-auto md:aspect-[2.56]">
        <video
          src={asset(`${videos}/vignes.mp4`)}
          poster={asset(`${videos}/vignes.jpg`)}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          // Sur mobile, le bandeau est très étroit : on zoome sur le centre.
          className="absolute inset-0 size-full object-cover max-md:scale-[1.8]"
        />
      </div>

      <div className="gutter py-10 max-md:px-6 md:py-24">
        <div className="mx-auto grid grid-cols-2 gap-3 md:w-[73%] md:gap-7">
          {bouteilles.map((photo) => (
            <Photo key={photo.src} {...photo} ratio={3 / 4} sizes="(max-width: 768px) 50vw, 650px" />
          ))}
        </div>
      </div>

      <Bandeau
        src={`${dossier}/moisson.webp`}
        alt="Moisson au pied des falaises, Domaine de la Gineste"
        position="50% 60%"
      />

      <div className="gutter py-10 max-md:px-6 md:py-24">
        <div className="mx-auto grid grid-cols-1 gap-5 md:w-[84%] md:grid-cols-2 md:gap-10">
          {reels.map((reel) => (
            <PhotoReel key={reel.video} {...reel} />
          ))}
        </div>
      </div>
    </>
  );
}

function Photo({ src, alt, ratio, sizes }: { src: string; alt: string; ratio: number; sizes: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-[12px] bg-sand md:rounded-[20px]"
      style={{ aspectRatio: ratio }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

function Bandeau({ src, alt, position }: { src: string; alt: string; position: string }) {
  return (
    <div className="relative h-[180px] w-full overflow-hidden md:h-auto md:aspect-[2.5]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

/**
 * Photo qui lance sa vidéo au survol de la souris ; au doigt ou au clavier,
 * il n'y a pas de survol : un appui bascule lecture / arrêt.
 */
function PhotoReel({ photo, video, alt }: { photo: string; video: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const pointeur = useRef<string>("");
  const [lecture, setLecture] = useState(false);

  const lancer = (survol: boolean) => {
    const el = ref.current;
    if (!el) return;
    setLecture(true);
    // Au survol, la vidéo boucle tant que la souris reste ; au doigt, elle
    // s'arrête à la fin et la photo revient.
    el.loop = survol;
    el.muted = false;
    el.play().catch(() => {
      // Sans interaction préalable avec la page, le son est bloqué : on lit en muet.
      el.muted = true;
      el.play().catch(() => {});
    });
  };

  const arreter = () => {
    const el = ref.current;
    setLecture(false);
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return (
    <button
      type="button"
      aria-label={`${lecture ? "Arrêter" : "Lire"} la vidéo : ${alt}`}
      className="relative block aspect-[3/5] w-full cursor-pointer overflow-hidden rounded-[12px] bg-sand outline-offset-4 md:rounded-[20px]"
      onPointerDown={(e) => (pointeur.current = e.pointerType)}
      onKeyDown={() => (pointeur.current = "")}
      onPointerEnter={(e) => e.pointerType === "mouse" && lancer(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && arreter()}
      onClick={() => {
        // À la souris, c'est le survol qui pilote la lecture.
        if (pointeur.current === "mouse") return;
        if (lecture) arreter();
        else lancer(false);
      }}
      onBlur={arreter}
    >
      <video
        ref={ref}
        src={asset(video)}
        playsInline
        onEnded={arreter}
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      />
      <Image
        src={photo}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 750px"
        className={`object-cover transition-opacity duration-500 ${lecture ? "opacity-0" : "opacity-100"}`}
      />

      {/* Pastille « play » en coin : signale qu'une vidéo se cache derrière la photo. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-3 left-3 transition-opacity duration-300 md:bottom-6 md:left-6 ${
          lecture ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="grid size-10 place-items-center rounded-full bg-ink/45 ring-1 ring-white/60 backdrop-blur-sm md:size-14">
          <svg viewBox="0 0 24 24" className="ml-0.5 size-4 fill-white md:size-6">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
