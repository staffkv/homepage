import {
  AboutSection,
  BookmarksSection,
  CommunitySection,
  ContactSection,
  InterestsSection,
  Intro,
  ProjectsSection,
} from "@/components/sections"
import { ExperienceSection } from "@/components/experience"

export default function Home() {
  return (
    <>
      <Intro />
      <AboutSection />
      <ExperienceSection num="02" />
      <ProjectsSection num="03" />
      <CommunitySection num="04" />
      <BookmarksSection num="05" limit={5} />
      <InterestsSection num="06" />
      <ContactSection />
    </>
  )
}
