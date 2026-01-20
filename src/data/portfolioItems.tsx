import React from "react"
import Icon from "../components/Icon/Icon"
import MemorySVG from "../components/Memory/components/MemorySVG"
import { firstToUpperCase } from "../utils"
import { TranslationKey } from "../i18n/translations"

export type PortfolioIconSpec =
  | { kind: "icon"; lib: string; name: string }
  | { kind: "memory"; size: string | number }

export interface PortfolioItemDef {
  id: string
  url: string
  title: { kind: "t"; key: TranslationKey } | { kind: "text"; text: string }
  navLabel?: { kind: "t"; key: TranslationKey } | { kind: "text"; text: string }
  icon: PortfolioIconSpec
  description: (t: (key: TranslationKey) => string) => React.ReactNode
  listClassName?: string
}

export function renderPortfolioIcon(icon: PortfolioIconSpec) {
  if (icon.kind === "memory") return <MemorySVG size={String(icon.size)} />
  return <Icon lib={icon.lib} name={icon.name} />
}

export function getPortfolioTitle(
  item: PortfolioItemDef,
  t: (key: TranslationKey) => string
) {
  if (item.title.kind === "text") return item.title.text
  return t(item.title.key)
}

export function getPortfolioNavLabel(
  item: PortfolioItemDef,
  t: (key: TranslationKey) => string
) {
  const label = item.navLabel ?? item.title
  if (label.kind === "text") return label.text
  return t(label.key)
}

// IMPORTANT: order follows the current Featured carousel order.
export const portfolioItems: PortfolioItemDef[] = [
  {
    id: "colors",
    url: "/portfolio/colors",
    icon: { kind: "icon", lib: "bi", name: "BiSolidColorFill" },
    title: { kind: "t", key: "ColorAccessibility" },
    navLabel: { kind: "t", key: "ColorAccessibility" },
    description: (t) =>
      `${t("WCAGTool")}. ${t("TestColorCombinations")} - ${t("AtAGlance")}.`,
  },
  {
    id: "jokes",
    url: "/portfolio/jokes",
    icon: { kind: "icon", lib: "gi", name: "GiAbstract019" },
    title: { kind: "t", key: "TheComediansCompanion" },
    navLabel: { kind: "t", key: "Jokes" },
    description: (t) =>
      `${t("JokeAppWithCustomizableOptions")}. ${t("UsesThreeDifferentAPI")} (${t("AndMyOwn")}). ${firstToUpperCase(
        t("SubmitAJoke").toLowerCase()
      )}. ${t("SeeLocalJokes")}.`,
  },
  {
    id: "blob",
    url: "/portfolio/blob",
    icon: { kind: "icon", lib: "ri", name: "RiDragMove2Fill" },
    title: { kind: "t", key: "BlobArtApp" },
    navLabel: { kind: "t", key: "Blob" },
    description: (t) =>
      `${t("BlobAppSlogan")}. ${t("BlobAppIntro")} ${t("SupportsLayers")}. ${t("SaveOrDownloadArt")}.`,
  },
  {
    id: "composer",
    url: "/portfolio/composer",
    icon: { kind: "icon", lib: "bs", name: "BsMusicNoteBeamed" },
    title: { kind: "t", key: "ComposerOlliSanta" },
    navLabel: { kind: "t", key: "ComposerOlliSanta" },
    description: (t) => `${t("ComposerIntro1")}`,
  },
  {
    id: "salon",
    url: "/portfolio/salon",
    icon: { kind: "icon", lib: "gi", name: "GiComb" },
    title: { kind: "t", key: "HairSalonWebsite" },
    navLabel: { kind: "t", key: "HairSalon" },
    description: (t) => `${t("Website")}: Parturi Kampaamo Hannastiina`,
  },
  {
    id: "media",
    url: "/portfolio/media",
    icon: { kind: "icon", lib: "io", name: "IoMdImages" },
    title: { kind: "t", key: "Media" },
    navLabel: { kind: "t", key: "Media" },
    description: (t) =>
      `${t("MediaWithQuotesOrPoems")}. ${t("UsesThreeDifferentAPI")} (${t("AndMyOwn")}).`,
  },
  {
    id: "draganddrop",
    url: "/portfolio/draganddrop",
    icon: { kind: "icon", lib: "ri", name: "RiDragDropLine" },
    title: { kind: "t", key: "DragAndDrop" },
    navLabel: { kind: "t", key: "DragAndDrop" },
    description: (t) =>
      `${t("DragAndDropAppIntro")} ${t(
        "ColorTheDraggableCardsAndContainersAndSortThem"
      )}`,
  },
  {
    id: "memory",
    url: "/portfolio/memory",
    icon: { kind: "memory", size: 50 },
    title: { kind: "t", key: "MemoryGame" },
    navLabel: { kind: "t", key: "MemoryGame" },
    description: (t) => t("MemoryGameIntro"),
  },
  {
    id: "select",
    url: "/portfolio/select",
    icon: { kind: "icon", lib: "bi", name: "BiSelectMultiple" },
    title: { kind: "t", key: "CustomSelect" },
    navLabel: { kind: "t", key: "CustomSelect" },
    description: (t) =>
      `${t("CustomSelectIntro")} ${t("PleaseFillInTheSurvey")}`,
  },
  {
    id: "quiz",
    url: "/portfolio/quiz",
    icon: { kind: "icon", lib: "md", name: "MdOutlineQuiz" },
    title: { kind: "t", key: "QuizApp" },
    navLabel: { kind: "t", key: "Quiz" },
    description: (t) => t("QuizAppIntro"),
  },
  {
    id: "form",
    url: "/portfolio/form",
    icon: { kind: "icon", lib: "ai", name: "AiOutlineForm" },
    title: { kind: "t", key: "MultistepForm" },
    navLabel: { kind: "t", key: "MultistepForm" },
    description: (t) => t("MultistepFormIntro"),
    listClassName: "multistep",
  },
  {
    id: "todo",
    url: "/portfolio/todo",
    icon: { kind: "icon", lib: "ri", name: "RiTodoLine" },
    title: { kind: "t", key: "TodoApp" },
    navLabel: { kind: "t", key: "ToDo" },
    description: (t) => t("TodoAppIntro"),
  },
  {
    id: "graphql",
    url: "/portfolio/graphql",
    icon: { kind: "icon", lib: "gr", name: "GrGraphQl" },
    title: { kind: "text", text: "GraphQL" },
    navLabel: { kind: "text", text: "GraphQL" },
    description: (t) => t("GraphQLSite"),
  },
]
