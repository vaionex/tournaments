"use client";
import Card from "@/app/dashboard/components/Card";
import { Button } from "@/components/ui/button";
import Section from "./components/Section";
import { Input } from "@/components/ui/input";
import Dropzone from "@/components/ui/dropzone";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import useUser from "@/hooks/auth/useUser";
import useFile from "@/hooks/util/useFile";
import useSponsorTournament from "@/hooks/sponsor/useSponsorTournament";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { HomeLine } from "untitledui-js-base";
import useTournament from "@/hooks/tournament/useTournament";

export default function CreateSponsorship() {
  const [amount, setAmount] = useState(0);
  const [banner, setBanner, bannerUrl] = useFile();
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setagreeToPrivacy] = useState(false);

  const { id } = useParams();
  const { push } = useRouter();
  const { data: { balance = 0 } = {} } = useUser();
  const { mutate: sponsor, isLoading } = useSponsorTournament();
  const { data: tournament } = useTournament(id);

  const agree = agreeToPrivacy && agreeToTerms;

  function handleSponsorship(e) {
    e.preventDefault();
    if (balance < amount) return toast.error("Insufficient balance");
    if (!banner) return toast.error("Please upload a banner");

    sponsor(
      { tournamentId: id, amount, banner, url, message },
      { onSuccess: () => push(`/dashboard/event/${id}`) },
    );
  }

  const sendButton = (
    <Button variant="green" disabled={!agree} loading={isLoading} type="submit">
      Confirm and Send
    </Button>
  );

  return (
    <Card>
      <form onSubmit={handleSponsorship} className="space-y-8">
        <div className="mb-6 flex items-center gap-6 text-neutral-400">
          <Link href="/">
            <HomeLine className="size-5" />
          </Link>
          <span className="text-white">/</span>
          <Link href="/sponsor/events">Tournaments</Link>
          <span className="text-white">/</span>
          <Link href={`/dashboard/event/${id}/overview`} className="text-white">
            {tournament?.name}
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold">Become a sponsor</div>
            <div className="text-lg text-neutral-400">
              Please fill out the form below to tell us more about your
              sponsorship preferences.
            </div>
          </div>
          {sendButton}
        </div>
        <div className="space-y-16 border-t border-white/10 pt-8">
          <div className="flex gap-8">
            <div className="w-64 text-xl font-semibold text-white">
              {tournament?.name}
            </div>
            <img src={tournament?.banner} className="w-96 rounded-lg" />
          </div>
          <Section
            label="Budget Alocation"
            description="What is your budget for sponsorship?"
          >
            <Card>
              <Input
                value={amount / 100}
                onChange={(e) =>
                  setAmount(Math.min(Number(e.target.value) * 100, balance))
                }
                min={0}
                type="number"
              />
              <div className="mt-2 flex gap-2">
                {[10, 25, 50, 100, 200]
                  .map((v) => v * 100)
                  .map((v) => (
                    <Button
                      variant={v == amount ? "green" : "secondary"}
                      className="text-sm"
                      onClick={() => setAmount(v)}
                      disabled={v > balance}
                      type="button"
                    >
                      ${v / 100}
                    </Button>
                  ))}
              </div>
            </Card>
          </Section>
          <Section
            label="Upload Sponsorship Material"
            description="Upload your banners or promotional content for the tournament."
          >
            <div className="space-y-4">
              <Dropzone onDrop={(files) => setBanner(files[0])} />
              {bannerUrl && (
                <img src={bannerUrl} className="w-full object-cover" />
              )}
              <Input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Destination URL for the ad"
                required
              />
            </div>
          </Section>

          <Section
            label="Marketing and Promotion"
            description="Please detail any specific requirements or conditions for your sponsorship. (e.g., exclusivity, specific placement of logos, speaking opportunities.)"
          >
            <Input
              type="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Section>

          <Section label="Consent and Agreement" description="">
            <div>
              <Checkbox
                label="I agree to the Terms and Conditions of Tournaments.com sponsorships."
                checked={agreeToTerms}
                onCheckedChange={setAgreeToTerms}
                id="terms"
              />
              <Checkbox
                label={
                  <>
                    I understand the{" "}
                    <Link className="underline" href="/privacy">
                      privacy policy
                    </Link>
                  </>
                }
                checked={agreeToPrivacy}
                onCheckedChange={setagreeToPrivacy}
                id="privacy"
              />
              <div className="mt-8">{sendButton}</div>
            </div>
          </Section>
        </div>
      </form>
    </Card>
  );
}
