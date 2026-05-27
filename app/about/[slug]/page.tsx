import { notFound } from "next/navigation";
import { MemberResumePageContent } from "@/components/about/member-resume-page";
import { TEAM_MEMBERS, getTeamMember } from "@/lib/team-data";

export function generateStaticParams() {
  return TEAM_MEMBERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return { title: "Profile" };
  return {
    title: `${member.name} — Profile`,
    description: member.recruiterSummary,
  };
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  return <MemberResumePageContent member={member} />;
}
