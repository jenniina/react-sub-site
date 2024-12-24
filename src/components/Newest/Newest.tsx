import { useTheme } from '../../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from '../../pages/css/welcome.module.css'
import Hero from '../Hero/Hero'
import { BiChat, BiSolidColorFill } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { IoMdImages } from 'react-icons/io'
import { GiAbstract019, GiNewShoot } from 'react-icons/gi'
import { MdOutlineQuiz } from 'react-icons/md'
import { RiDragDropLine, RiTodoLine, RiFileList3Line } from 'react-icons/ri'
import { GiComb } from 'react-icons/gi'
import { FaStoreAlt } from 'react-icons/fa'
import { TbTriangleInverted, TbBlob } from 'react-icons/tb'
import { LuArrowRightToLine } from 'react-icons/lu'
import { LiaNewspaperSolid } from 'react-icons/lia'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { firstToLowerCase } from '../../utils'
import {
  EAbout,
  EAccessibility,
  EAddedAnotherInstanceOfTheBlobArtApp,
  EBlobs,
  EButton,
  EButtons,
  EChangeCategoryTitle,
  EChangeLanguage,
  EContact,
  EDelete,
  EDragAndDrop,
  EGraphQLSite,
  EHairSalonWebsite,
  EHeroSection,
  ELanguages,
  ENews,
  EOlderNews,
  EPortfolio,
  EQuiz,
  EQuizAppIntro,
  EReset,
  ETestYourKnowledge,
  EAddANewCategory,
  EStore,
  EDisclaimer,
  ETermsOfService,
  EPage,
} from '../../interfaces'
import {
  ECategories,
  ECategoryTitle,
  EJokeType,
  ESafemode,
  ETheComediansCompanion,
  TCategoryByLanguages,
} from '../Jokes/interfaces'
import {
  EAddedNewFeatures,
  EAddedNewIntroElements,
  EAugust,
  EBugFixes,
  EDecember,
  EFebruary,
  EMigratedSiteToAnotherAzureSubscription,
  ENewPortfolioItem,
  EOctober,
  EOptimizing,
  ESiteMigration,
  EImprovedAccessibility,
  ESeptember,
  EJuly,
  ERandomHeadingItemMovement,
  EAdded,
  ELaunchedAnOnlineOrderingSystem,
  ENovember,
} from '../../interfaces/welcome'
import { Select, SelectOption } from '../Select/Select'
import { EPriority, ETodoApp } from '../Todo/interfaces'
import {
  ETasksCanBeEdited,
  ETasksCanBeReorganizedByDraggingAndDropping,
} from '../../interfaces/todo'
import { GrGraphQl } from 'react-icons/gr'
import {
  EAddedPaginationToSavedArt,
  EChangedAllControlsToButtons,
  ECloneABlobByClickingTheTopLeftPlusSign,
  EDragBlobToIconsNextToLayerButtons,
  EEditArtwork,
  ELayers,
  ELoginToSaveBlobsToServer,
  EManyVersions,
  EMoveEveryBlobUpOrDownOneLayerByPressingTheButtons,
  EMoveViewInDifferentDirections,
  ENameYourArtwork,
  EPressSpaceOrRWithABlobInFocusToCycleThroughRandomColors,
  ERemovable,
  ERemoveABlobByClickingTheBottomLeftXSign,
  ERenameYourArtwork,
  ESampleArtwork,
  EScreenshot,
  EToggleControlVisibility,
} from '../../interfaces/blobs'
import { EAddAColor, EAddGenericCardsAndColorThem } from '../../interfaces/draganddrop'
import { EComposerOlliSanta, EAddedALinkToComposer } from '../../interfaces/composer'
import Accordion from '../Accordion/Accordion'
import {
  EColorAccessibility,
  EGenerateColors,
  ETestColorCombinations,
} from '../../interfaces/colors'
import { EMemoryGame, EMemoryGameIntro } from '../../interfaces/memory'
import MemorySVG from '../Memory/components/MemorySVG'
import { EMedia, EMediaWithQuotesOrPoems } from '../../interfaces/images'

export default function Newest({ language }: { language: ELanguages }) {
  const lightTheme = useTheme()

  return (
    <div className={`${styles.newest}`}>
      <h2 className={`${styles.subheading}`}>
        <LiaNewspaperSolid /> {ENews[language]}
      </h2>
      <ul className={`${styles.extras}`}>
        <li className={styles.first}>
          <strong>2024</strong>
          <ul>
            <li>
              <strong>{EDecember[language]}</strong>
              <ul>
                <li>
                  <Link to='/portfolio/todo'>
                    <RiTodoLine />
                    {ETodoApp[language]}:
                  </Link>{' '}
                  <i>
                    {EAddedNewFeatures[language]}: {firstToLowerCase(EPriority[language])}{' '}
                    & {firstToLowerCase(ECategoryTitle[language])}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/media'>
                    <IoMdImages />
                    {EMedia[language]}:
                  </Link>
                  <i>
                    {ENewPortfolioItem[language]}: {EMediaWithQuotesOrPoems[language]}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/colors'>
                    <BiSolidColorFill />
                    {EColorAccessibility[language]}:
                  </Link>
                  <i>
                    {EAddedNewFeatures[language]}: {EGenerateColors[language]}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/memory'>
                    <MemorySVG size='32' />
                    {EMemoryGame[language]}:
                  </Link>
                  <i>
                    {ENewPortfolioItem[language]}: {EMemoryGameIntro[language]}
                  </i>
                </li>
              </ul>
            </li>
            <li>
              <strong>{ENovember[language]}</strong>
              <ul>
                <li>
                  <Link to='/portfolio/blob'>
                    <TbBlob />
                    {EBlobs[language]}:
                  </Link>
                  <i>{EChangedAllControlsToButtons[language]}</i>
                </li>
                <li>
                  <Link to='/portfolio/colors'>
                    <BiSolidColorFill />
                    {EColorAccessibility[language]}:
                  </Link>
                  <i>
                    {ENewPortfolioItem[language]}: {ETestColorCombinations[language]}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/composer'>
                    <BsMusicNoteBeamed />
                    {EComposerOlliSanta[language]}:
                  </Link>
                  <i>
                    {EAddedNewIntroElements[language]} ({EHeroSection[language]} )
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/composer'>
                    <BsMusicNoteBeamed />
                    {EComposerOlliSanta[language]}:
                  </Link>
                  <i>
                    {ENewPortfolioItem[language]}: {EAddedALinkToComposer[language]}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/draganddrop'>
                    <RiDragDropLine />
                    {EDragAndDrop[language]}:
                  </Link>
                  <i>{EBugFixes[language]}</i>
                </li>
              </ul>
            </li>
            <li>
              <strong>{EOctober[language]}</strong>
              <ul>
                <li>
                  <Link to='/store'>
                    <FaStoreAlt />
                    {EStore[language]}:
                  </Link>
                  <i>{ELaunchedAnOnlineOrderingSystem[language]}</i>
                </li>
                <li>
                  <Link to='/terms'>
                    <RiFileList3Line />
                    {ETermsOfService[language]}:
                  </Link>
                  <i>
                    {EAdded[language]}: {ETermsOfService[language]} ({EPage[language]})
                  </i>
                </li>
              </ul>
            </li>
            <li>
              <strong>{ESeptember[language]}</strong>
              <ul>
                <li>
                  <Link to='/portfolio/draganddrop'>
                    <RiDragDropLine />
                    {EDragAndDrop[language]}:
                  </Link>
                  <i>
                    {EAddedNewFeatures[language]}:{' '}
                    {firstToLowerCase(EAddGenericCardsAndColorThem[language])}
                  </i>
                </li>

                <li>
                  <Link to='/portfolio/blob'>
                    <TbBlob />
                    {EBlobs[language]}:
                  </Link>
                  <i>
                    {EAddedNewFeatures[language]}:{' '}
                    {EPressSpaceOrRWithABlobInFocusToCycleThroughRandomColors[language]}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/draganddrop'>
                    <RiDragDropLine />
                    {EDragAndDrop[language]}:
                  </Link>
                  <i>
                    {EAddedNewFeatures[language]}: {EDelete[language].toLowerCase()} (
                    {firstToLowerCase(ECategoryTitle[language])}),{' '}
                    {firstToLowerCase(EAddANewCategory[language])}
                  </i>
                </li>
                <li>
                  <a className='disabled'>
                    <TbTriangleInverted />
                    {EHeroSection[language]}:
                  </a>{' '}
                  <i>
                    {EAddedNewFeatures[language]}: {ERandomHeadingItemMovement[language]}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/draganddrop'>
                    <RiDragDropLine />
                    {EDragAndDrop[language]}:
                  </Link>
                  <i>
                    {EBugFixes[language]}. {EAccessibility[language]}:{' '}
                    {EOptimizing[language].toLowerCase()}.
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/blob'>
                    <TbBlob />
                    {EBlobs[language]}:
                  </Link>
                  <i>{EAddedAnotherInstanceOfTheBlobArtApp[language]} </i>
                </li>
                <li>
                  <Link to='/portfolio/blob'>
                    <TbBlob />
                    {EBlobs[language]}:
                  </Link>
                  <i>
                    {ESampleArtwork[language]}. {EAddedNewFeatures[language]}:{' '}
                    {EAddedPaginationToSavedArt[language]}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/blob'>
                    <TbBlob />
                    {EBlobs[language]}:
                  </Link>
                  <i>
                    {EAddedNewFeatures[language]}: {EScreenshot[language]}!{' '}
                    {EMoveEveryBlobUpOrDownOneLayerByPressingTheButtons[language]}.{' '}
                    {EDragBlobToIconsNextToLayerButtons[language]}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/draganddrop'>
                    <RiDragDropLine />
                    {EDragAndDrop[language]}:
                  </Link>
                  <i>
                    {EAddedNewFeatures[language]}:{' '}
                    {firstToLowerCase(EAddAColor[language])},{' '}
                    {firstToLowerCase(EChangeCategoryTitle[language])},{' '}
                    {firstToLowerCase(EReset[language])},{' '}
                    {firstToLowerCase(ERemovable[language])}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/blob'>
                    <TbBlob />
                    {EBlobs[language]}:
                  </Link>
                  <i>
                    {EAddedNewFeatures[language]}:{' '}
                    {firstToLowerCase(ELoginToSaveBlobsToServer[language])},{' '}
                    {firstToLowerCase(EManyVersions[language])},{' '}
                    {firstToLowerCase(ENameYourArtwork[language])},{' '}
                    {firstToLowerCase(ERenameYourArtwork[language])},{' '}
                    {firstToLowerCase(EEditArtwork[language])}
                  </i>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <Accordion
        language={language}
        text={EOlderNews[language]}
        className={`${styles.oldernews} oldernews`}
        wrapperClass={styles['oldernews-wrap']}
      >
        <>
          <ul className={`${styles.extras}`}>
            <li>
              <strong>2024</strong>
              <ul>
                <li>
                  <strong>{EAugust[language]}</strong>
                  <ul>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {EBlobs[language]}:
                      </Link>
                      <i>
                        {EAddedNewFeatures[language]}:{' '}
                        {firstToLowerCase(ELayers[language])};{' '}
                        {firstToLowerCase(EButton[language])}:{' '}
                        {firstToLowerCase(EToggleControlVisibility[language])}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {EBlobs[language]}:
                      </Link>
                      <i>{EImprovedAccessibility[language]}</i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {EBlobs[language]}:
                      </Link>
                      <i>
                        {EAddedNewFeatures[language]}:{' '}
                        {firstToLowerCase(EMoveViewInDifferentDirections[language])} (
                        {firstToLowerCase(EButtons[language])}). {EBugFixes[language]}.
                      </i>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>{EJuly[language]}</strong>
                  <ul>
                    <li>
                      <a className='disabled'>
                        <LuArrowRightToLine />
                        <span>{ESiteMigration[language]} </span>
                      </a>
                      <i>{EMigratedSiteToAnotherAzureSubscription[language]}</i>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>{EFebruary[language]}</strong>
                  <ul>
                    <li>
                      <Link to='/portfolio/graphql'>
                        <GrGraphQl />
                        <span>{EGraphQLSite[language]}</span>
                      </Link>
                      <i>{ENewPortfolioItem[language]}</i>
                    </li>
                    <li>
                      <Link to='/portfolio/quiz'>
                        <TbTriangleInverted />
                        {EHeroSection[language]}:
                      </Link>{' '}
                      <i>{EAddedNewIntroElements[language]}</i>
                    </li>
                    <li>
                      <Link to='/portfolio/salon'>
                        <GiComb />
                        {EHairSalonWebsite[language]}:
                      </Link>{' '}
                      <i>Parturi Kampaamo Hannastiina</i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {EBlobs[language]}:
                      </Link>
                      <i>
                        {EBugFixes[language]}. {EOptimizing[language]}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/todo'>
                        <RiTodoLine />
                        {ETodoApp[language]}:
                      </Link>{' '}
                      <i>
                        {EAddedNewFeatures[language]}:{' '}
                        {firstToLowerCase(ETasksCanBeEdited[language])} &{' '}
                        {firstToLowerCase(
                          ETasksCanBeReorganizedByDraggingAndDropping[language]
                        )}
                      </i>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <Accordion
            language={language}
            text='2023'
            className={`${styles.oldernews} oldernews`}
            wrapperClass={styles['oldernews-wrap2']}
          >
            <>
              <ul className={`${styles.extras}`}>
                <li>
                  <strong>2023</strong>
                  <ul>
                    <li>
                      <strong>{EDecember[language]}</strong>
                      <ul>
                        <li>
                          <Link to='/portfolio/jokes'>
                            <GiAbstract019 />
                            {ETheComediansCompanion[language]}:
                          </Link>{' '}
                          <i>
                            {EAddedNewFeatures[language]}. {EOptimizing[language]}
                          </i>
                        </li>
                      </ul>
                    </li>{' '}
                    <li>
                      <strong>{EOctober[language]}</strong>
                      <ul>
                        <li>
                          <Link to='/portfolio/quiz'>
                            <MdOutlineQuiz />
                            {EQuiz[language]}:
                          </Link>{' '}
                          <i>
                            {ENewPortfolioItem[language]}. {ETestYourKnowledge[language]};{' '}
                            {EQuizAppIntro[language]}
                          </i>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          </Accordion>
        </>
      </Accordion>
    </div>
  )
}
