"use client";
import TournamentCard from "../../../components/tournament/tournament-card";
import Link from "next/link";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "untitledui-js-base";
import { useRef } from "react";
import useUpcomingTournaments from "@/hooks/tournament/useUpcomingTournaments";
import LogoMarkOutline from "@/components/icons/logo-mark-outline";

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
    <div className="rounded-lg p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-bold">
          <LogoMarkOutline className="mr-2 inline-block text-neutral-500" />
          Upcoming tournaments
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => slickRef.current.slickPrev()}>
              <ChevronLeft />
            </button>
            <button onClick={() => slickRef.current.slickNext()}>
              <ChevronRight />
            </button>
          </div>
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
