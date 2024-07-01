"use client";
import TournamentCard from "../tournaments/tournament-card";
import Link from "next/link";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "untitledui-js-base";
import { useRef } from "react";
import useUpcomingTournaments from "@/hooks/tournament/useUpcomingTournaments";

export default function Tournaments() {
  const { data: tournaments = [] } = useUpcomingTournaments();
  const slickRef = useRef();

  function Arrow() {
    return <div />;
  }

  var settings = {
    className: "slider variable-width",
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: false,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  return (
    <div className="rounded-lg border border-neutral-800 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tournaments</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => slickRef.current.slickPrev()}>
              <ChevronLeft />
            </button>
            <button onClick={() => slickRef.current.slickNext()}>
              <ChevronRight />
            </button>
          </div>
          <Link
            className="text-lg font-semibold text-neutral-300"
            href="/dashboard/tournaments"
          >
            View All
          </Link>
        </div>
      </div>
      <Slider {...settings} ref={slickRef}>
        {tournaments.map((tournament) => (
          <TournamentCard
            className="mr-6 w-[25rem]"
            {...tournament}
            key={tournament.id}
          />
        ))}
      </Slider>
    </div>
  );
}
