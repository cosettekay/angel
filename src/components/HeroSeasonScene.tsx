import { useEffect, useRef, useState } from "react";
import "./HeroSeasonScene.css";

const SEASONS = ["spring", "summer", "fall", "winter"] as const;

// light snowfall (unchanged)
const SNOWFLAKES: readonly number[] = Array.from({ length: 20 }, (_, i) => i + 1);

function PetalWrapper({ className = "" }: { className?: string }) {
  return (
    <div className={`petal ${className}`}>
      <div className="petal">
        <div className="petal" />
      </div>
    </div>
  );
}

function HeroSeasonScene() {
  const sceneRef = useRef<HTMLDivElement>(null);      // .background container
  const fallLayerRef = useRef<HTMLDivElement>(null);  // NEW: fall particle layer
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [isDormant, setIsDormant] = useState(false);

  // stagger pop delays (unchanged)
  useEffect(() => {
    const root = sceneRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(
      ".tree, .tree .branch, .tree .leaf, .tree .flower1, .tree .heart, .tree .tulip",
    );

    const depths = [0, 0, 0];
    targets.forEach((element) => {
      const className = element.className;

      if (className.includes("branch-inner")) {
        depths[1] += 1;
        depths[2] = 0;
      } else if (className.includes("branch")) {
        depths[0] += 1;
        depths[1] = 0;
        depths[2] = 0;
      } else if (className.includes("leaf") || className.includes("flower1")) {
        depths[2] += 1;
      }

      const time = 0.3 + depths[0] * 0.35 + depths[1] * 0.25 + depths[2] * 0.15;
      element.style.setProperty("--pop-delay", `${time}s`);
    });
  }, []);

  // season cycle (unchanged)
  useEffect(() => {
    const duration = 15000;
    const dormantDuration = 1500;
    const timer = setTimeout(() => {
      if (isDormant) {
        setIsDormant(false);
        setSeasonIndex(0);
        return;
      }
      if (seasonIndex === SEASONS.length - 1) {
        setIsDormant(true);
      } else {
        setSeasonIndex((prev) => (prev + 1) % SEASONS.length);
      }
    }, isDormant ? dormantDuration : duration);

    return () => clearTimeout(timer);
  }, [seasonIndex, isDormant]);

  // const currentSeason = SEASONS[seasonIndex];
  // const backgroundClass = [
  //   "background",
  //   `season--${currentSeason}`,
  //   isDormant ? "season--dormant" : "",
  // ]
  //   .join(" ")
  //   .trim();

// 1) Lock to "fall"
const currentSeason = "fall" as const;

// 2) Build the class (no dormant class when frozen)
const backgroundClass = ["background", `season--${currentSeason}`].join(" ");

  /* === FALL ONLY: spawn vertical particles from real leaf positions === */
  useEffect(() => {
    if (currentSeason !== "fall") {
      // clear any existing particles when leaving fall
      fallLayerRef.current?.replaceChildren();
      return;
    }
    const bg = sceneRef.current;
    const layer = fallLayerRef.current;
    if (!bg || !layer) return;

    const bgRect = bg.getBoundingClientRect();
    const sources = bg.querySelectorAll<HTMLElement>(".leaf.leaf--fallable");

    const spawn = (x: number, y: number) => {
      const s = document.createElement("span");
      s.className = "season-fall__leaf";
      // slight per-particle variety
      const delay = (Math.random() * 1.5).toFixed(2);
      const dur   = (5.5 + Math.random() * 3.5).toFixed(2);
      const size  = (12 + Math.random() * 10).toFixed(0);
      s.style.setProperty("--x", `${x}px`);
      s.style.setProperty("--y", `${y}px`);
      s.style.setProperty("--delay", `${delay}s`);
      s.style.setProperty("--dur", `${dur}s`);
      s.style.setProperty("--size", `${size}px`);
      layer.appendChild(s);

      // cleanup this particle after its animation
      const total = (parseFloat(delay) + parseFloat(dur)) * 1000;
      const t = setTimeout(() => s.remove(), total + 150);
      // defensively store cleanup on the element (optional)
      (s as any).__cleanup = () => clearTimeout(t);
    };

    // initial seeding: 1–2 per fallable leaf
    sources.forEach((leaf) => {
      const r = leaf.getBoundingClientRect();
      const x = r.left - bgRect.left + r.width / 2;
      const y = r.top  - bgRect.top  + r.height / 2;
      spawn(x, y);
      if (Math.random() > 0.5) spawn(x, y + Math.random() * 6);
    });

    // trickle while in fall
    const trickle = setInterval(() => {
      if (!sources.length) return;
      const el = sources[Math.floor(Math.random() * sources.length)];
      const r = el.getBoundingClientRect();
      const x = r.left - bgRect.left + r.width / 2;
      const y = r.top  - bgRect.top  + r.height / 2;
      spawn(x, y);
    }, 900);

    // cleanup when leaving fall/unmount
    return () => {
      clearInterval(trickle);
      // clear the layer
      layer.replaceChildren();
    };
  }, [currentSeason]);

  return (
    <div className="relative flex justify-center">
      <div className="season-frame">
        <div className="season-frame__halo" />
        <div className="season-frame__ground" />

        <div className={backgroundClass} ref={sceneRef}>
          <div className="slope" />

          {/* ===== Tree markup (unchanged) ===== */}
          <div className="tree">
            <div className="leaf leaf1" />
            <div className="leaf leaf2 leaf--fallable" />

            <div className="branch left branch1">
              <div className="branch left branch-inner1">
                <div className="leaf leaf1" />
                <div className="leaf leaf2" />
                <div className="leaf leaf3 leaf--fallable" />
                <div className="heart flower1 blueflower" />
              </div>
              <div className="branch left branch-inner2">
                <div className="leaf leaf1 leaf--fallable" />
                <div className="leaf leaf2" />
                <div className="leaf leaf3" />
                <div className="tulip flower1 redflower">
                  <div className="peak" />
                </div>
              </div>
              <div className="branch left branch-inner3">
                <div className="leaf leaf1" />
                <div className="leaf leaf2" />
              </div>
              <div className="flower petal5 flower1 redflower">
                <PetalWrapper />
              </div>
            </div>

            <div className="branch right branch2">
              <div className="branch left branch-inner1">
                <div className="leaf leaf1" />
                <div className="leaf leaf2 leaf--fallable" />
                <div className="leaf leaf3" />
                <div className="flower petal5 flower1 blueflower">
                  <PetalWrapper />
                </div>
              </div>
              <div className="branch right branch-inner2">
                <div className="leaf leaf1 leaf--fallable" />
                <div className="leaf leaf2" />
                <div className="leaf leaf3" />
                <div className="tulip flower1 greenflower">
                  <div className="peak" />
                </div>
              </div>
              <div className="branch right branch-inner3">
                <div className="leaf leaf1" />
                <div className="leaf leaf2" />
                <div className="leaf leaf3 leaf--fallable" />
                <div className="branch left branch-inner4">
                  <div className="leaf leaf1" />
                  <div className="flower petal5 flower1 yellowflower">
                    <PetalWrapper />
                  </div>
                </div>
                <div className="tulip flower1 purpleflower">
                  <div className="peak" />
                </div>
              </div>
              <div className="flower roundpetal flower1">
                <PetalWrapper />
              </div>
            </div>

            <div className="branch left branch3">
              <div className="branch right branch-inner1">
                <div className="leaf leaf1" />
                <div className="leaf leaf2" />
                <div className="leaf leaf3 leaf--fallable" />
                <div className="heart flower1" />
              </div>
              <div className="branch left branch-inner2">
                <div className="leaf leaf1" />
                <div className="leaf leaf2" />
                <div className="leaf leaf3" />
                <div className="tulip flower1">
                  <div className="peak" />
                </div>
              </div>
              <div className="leaf leaf1 leaf--fallable" />
              <div className="leaf leaf2" />
              <div className="flower roundpetal petal5 flower1 purpleflower">
                <PetalWrapper />
              </div>
            </div>

            <div className="branch right branch4">
              <div className="branch left branch-inner1">
                <div className="leaf leaf1" />
                <div className="leaf leaf2 leaf--fallable" />
                <div className="leaf leaf3" />
                <div className="flower petal5 flower1 yellowflower">
                  <PetalWrapper />
                </div>
              </div>
              <div className="branch right branch-inner2">
                <div className="leaf leaf1 leaf--fallable" />
                <div className="leaf leaf2" />
                <div className="leaf leaf3" />
                <div className="tulip tulip1 flower1 purpleflower">
                  <div className="peak" />
                </div>
              </div>
              <div className="flower roundpetal flower1">
                <PetalWrapper />
              </div>
            </div>

            <div className="branch left branch5">
              <div className="branch right branch-inner1">
                <div className="leaf leaf1 leaf--fallable" />
                <div className="leaf leaf2" />
                <div className="leaf leaf3" />
                <div className="heart flower1" />
              </div>
              <div className="branch left branch-inner2">
                <div className="leaf leaf1" />
                <div className="leaf leaf2" />
                <div className="leaf leaf3" />
                <div className="tulip flower1 greenflower">
                  <div className="peak" />
                </div>
              </div>
              <div className="flower roundpetal petal5 flower1 blueflower">
                <PetalWrapper />
              </div>
            </div>
          </div>

          {/* FALL particles (spawned dynamically; clipped to globe via CSS mask) */}
          <div className="season-fall" ref={fallLayerRef} />

          {/* WINTER particles (unchanged) */}
          <div className="season-snow">
            {SNOWFLAKES.map((flake) => (
              <span
                key={flake}
                className={`season-snow__flake season-snow__flake--${flake}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSeasonScene;
