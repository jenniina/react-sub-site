import { Link } from 'react-router-dom'
import styles from '../../pages/css/welcome.module.css'
import { BiSolidColorFill } from 'react-icons/bi'
import { BsCart2, BsPerson } from 'react-icons/bs'
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
import { ELanguages } from '../../types'
import { GrGraphQl } from 'react-icons/gr'
import Accordion from '../Accordion/Accordion'
import MemorySVG from '../Memory/components/MemorySVG'
import { useContext } from 'react'
import { LanguageContext } from '../../contexts/LanguageContext'

export default function Newest({ language }: { language: ELanguages }) {
  const { t } = useContext(LanguageContext)!

  return (
    <div className={`${styles.newest}`}>
      <h2 className={`${styles.subheading}`}>
        <LiaNewspaperSolid /> {t('EChangeLog')}
      </h2>
      <ul className={`${styles.extras}`}>
        <li className={styles.first}>
          <strong>2025</strong>
          <ul>
            <li>
              <strong>{t('EMarch')}</strong>
              <ul>
                <li>
                  <Link to='/cart'>
                    <BsCart2 />
                    {t('ECart')}:
                  </Link>
                  <i>{t('EBugFixes')}</i>
                </li>
              </ul>
            </li>
            <li>
              <strong>{t('EFebruary')}</strong>
              <ul>
                <li>
                  <Link to='/portfolio/media'>
                    <IoMdImages />
                    {t('EMedia')}:
                  </Link>
                  <i>{t('EChangedQuotesAPI')}</i>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className={styles.first}>
          <strong>2024</strong>
          <ul>
            <li>
              <strong>{t('EDecember')}</strong>
              <ul>
                <li>
                  <a className='disabled'>
                    <LuArrowRightToLine />
                    <span>{t('ESiteMigration')}: </span>
                  </a>
                  <i>{t('EMovedBackendFromAzureToMyOwnDomain')}</i>
                </li>
                <li>
                  <Link to='/portfolio/todo'>
                    <RiTodoLine />
                    {t('ETodoApp')}:
                  </Link>{' '}
                  <i>
                    {t('EAddedNewFeatures')}: {firstToLowerCase(t('EPriority'))} &{' '}
                    {firstToLowerCase(t('ECategoryTitle'))}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/media'>
                    <IoMdImages />
                    {t('EMedia')}:
                  </Link>
                  <i>
                    {t('ENewPortfolioItem')}: {t('EMediaWithQuotesOrPoems')}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/colors'>
                    <BiSolidColorFill />
                    {t('EColorAccessibility')}:
                  </Link>
                  <i>
                    {t('EAddedNewFeatures')}: {t('EGenerateColors')}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/memory'>
                    <MemorySVG size='32' />
                    {t('EMemoryGame')}:
                  </Link>
                  <i>
                    {t('ENewPortfolioItem')}: {t('EMemoryGameIntro')}
                  </i>
                </li>
              </ul>
            </li>
            <li>
              <strong>{t('ENovember')}</strong>
              <ul>
                <li>
                  <Link to='/portfolio/blob'>
                    <TbBlob />
                    {t('EBlobs')}:
                  </Link>
                  <i>{t('EChangedAllControlsToButtons')}</i>
                </li>
                <li>
                  <Link to='/portfolio/colors'>
                    <BiSolidColorFill />
                    {t('EColorAccessibility')}:
                  </Link>
                  <i>
                    {t('ENewPortfolioItem')}: {t('ETestColorCombinations')}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/composer'>
                    <BsMusicNoteBeamed />
                    {t('EComposerOlliSanta')}:
                  </Link>
                  <i>
                    {t('EAddedNewIntroElements')} ({t('EHeroSection')} )
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/composer'>
                    <BsMusicNoteBeamed />
                    {t('EComposerOlliSanta')}:
                  </Link>
                  <i>
                    {t('ENewPortfolioItem')}: {t('EAddedALinkToComposer')}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/draganddrop'>
                    <RiDragDropLine />
                    {t('EDragAndDrop')}:
                  </Link>
                  <i>{t('EBugFixes')}</i>
                </li>
              </ul>
            </li>
            <li>
              <strong>{t('EOctober')}</strong>
              <ul>
                <li>
                  <Link to='/store'>
                    <FaStoreAlt />
                    {t('EStore')}:
                  </Link>
                  <i>{t('ELaunchedAnOnlineOrderingSystem')}</i>
                </li>
                <li>
                  <Link to='/terms'>
                    <RiFileList3Line />
                    {t('ETermsOfService')}:
                  </Link>
                  <i>
                    {t('EAdded')}: {t('ETermsOfService')} ({t('EPage')})
                  </i>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <Accordion
        language={language}
        text={t('EOlderNews')}
        className={`${styles.oldernews} oldernews`}
        wrapperClass={styles['oldernews-wrap']}
      >
        <>
          <ul className={`${styles.extras}`}>
            <li>
              <strong>2024</strong>
              <ul>
                <li>
                  <strong>{t('ESeptember')}</strong>
                  <ul>
                    <li>
                      <Link to='/portfolio/draganddrop'>
                        <RiDragDropLine />
                        {t('EDragAndDrop')}:
                      </Link>
                      <i>
                        {t('EAddedNewFeatures')}:{' '}
                        {firstToLowerCase(t('EAddGenericCardsAndColorThem'))}
                      </i>
                    </li>

                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('EBlobs')}:
                      </Link>
                      <i>
                        {t('EAddedNewFeatures')}:{' '}
                        {t('EPressSpaceOrRWithABlobInFocusToCycleThroughRandomColors')}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/draganddrop'>
                        <RiDragDropLine />
                        {t('EDragAndDrop')}:
                      </Link>
                      <i>
                        {t('EAddedNewFeatures')}: {t('EDelete').toLowerCase()} (
                        {firstToLowerCase(t('ECategoryTitle'))}),{' '}
                        {firstToLowerCase(t('EAddANewCategory'))}
                      </i>
                    </li>
                    <li>
                      <a className='disabled'>
                        <TbTriangleInverted />
                        {t('EHeroSection')}:
                      </a>{' '}
                      <i>
                        {t('EAddedNewFeatures')}: {t('ERandomHeadingItemMovement')}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/draganddrop'>
                        <RiDragDropLine />
                        {t('EDragAndDrop')}:
                      </Link>
                      <i>
                        {t('EBugFixes')}. {t('EAccessibility')}:{' '}
                        {t('EOptimizing').toLowerCase()}.
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('EBlobs')}:
                      </Link>
                      <i>{t('EAddedAnotherInstanceOfTheBlobArtApp')} </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('EBlobs')}:
                      </Link>
                      <i>
                        {t('ESampleArtwork')}. {t('EAddedNewFeatures')}:{' '}
                        {t('EAddedPaginationToSavedArt')}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('EBlobs')}:
                      </Link>
                      <i>
                        {t('EAddedNewFeatures')}: {t('EScreenshot')}!{' '}
                        {t('EMoveEveryBlobUpOrDownOneLayerByPressingTheButtons')}.{' '}
                        {t('EDragBlobToIconsNextToLayerButtons')}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/draganddrop'>
                        <RiDragDropLine />
                        {t('EDragAndDrop')}:
                      </Link>
                      <i>
                        {t('EAddedNewFeatures')}: {firstToLowerCase(t('EAddAColor'))},{' '}
                        {firstToLowerCase(t('EChangeCategoryTitle'))},{' '}
                        {firstToLowerCase(t('EReset'))},{' '}
                        {firstToLowerCase(t('ERemovable'))}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('EBlobs')}:
                      </Link>
                      <i>
                        {t('EAddedNewFeatures')}:{' '}
                        {firstToLowerCase(t('ELoginToSaveBlobsToServer'))},{' '}
                        {firstToLowerCase(t('EManyVersions'))},{' '}
                        {firstToLowerCase(t('ENameYourArtwork'))},{' '}
                        {firstToLowerCase(t('ERenameYourArtwork'))},{' '}
                        {firstToLowerCase(t('EEditArtwork'))}
                      </i>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>{t('EAugust')}</strong>
                  <ul>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('EBlobs')}:
                      </Link>
                      <i>
                        {t('EAddedNewFeatures')}: {firstToLowerCase(t('ELayers'))};{' '}
                        {firstToLowerCase(t('EButton'))}:{' '}
                        {firstToLowerCase(t('EToggleControlVisibility'))}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('EBlobs')}:
                      </Link>
                      <i>{t('EImprovedAccessibility')}</i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('EBlobs')}:
                      </Link>
                      <i>
                        {t('EAddedNewFeatures')}:{' '}
                        {firstToLowerCase(t('EMoveViewInDifferentDirections'))} (
                        {firstToLowerCase(t('EButtons'))}). {t('EBugFixes')}.
                      </i>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>{t('EJuly')}</strong>
                  <ul>
                    <li>
                      <a className='disabled'>
                        <LuArrowRightToLine />
                        <span>{t('ESiteMigration')}: </span>
                      </a>
                      <i>{t('EMigratedSiteToAnotherAzureSubscription')}</i>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>{t('EFebruary')}</strong>
                  <ul>
                    <li>
                      <Link to='/portfolio/graphql'>
                        <GrGraphQl />
                        <span>{t('EGraphQLSite')}</span>
                      </Link>
                      <i>{t('ENewPortfolioItem')}</i>
                    </li>
                    <li>
                      <Link to='/portfolio/quiz'>
                        <TbTriangleInverted />
                        {t('EHeroSection')}:
                      </Link>{' '}
                      <i>{t('EAddedNewIntroElements')}</i>
                    </li>
                    <li>
                      <Link to='/portfolio/salon'>
                        <GiComb />
                        {t('EHairSalonWebsite')}:
                      </Link>{' '}
                      <i>Parturi Kampaamo Hannastiina</i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('EBlobs')}:
                      </Link>
                      <i>
                        {t('EBugFixes')}. {t('EOptimizing')}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/todo'>
                        <RiTodoLine />
                        {t('ETodoApp')}:
                      </Link>{' '}
                      <i>
                        {t('EAddedNewFeatures')}:{' '}
                        {firstToLowerCase(t('ETasksCanBeEdited'))} &{' '}
                        {firstToLowerCase(
                          t('ETasksCanBeReorganizedByDraggingAndDropping')
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
                      <strong>{t('EDecember')}</strong>
                      <ul>
                        <li>
                          <Link to='/portfolio/jokes'>
                            <GiAbstract019 />
                            {t('ETheComediansCompanion')}:
                          </Link>{' '}
                          <i>
                            {t('EAddedNewFeatures')}. {t('EOptimizing')}
                          </i>
                        </li>
                      </ul>
                    </li>{' '}
                    <li>
                      <strong>{t('EOctober')}</strong>
                      <ul>
                        <li>
                          <Link to='/portfolio/quiz'>
                            <MdOutlineQuiz />
                            {t('EQuiz')}:
                          </Link>{' '}
                          <i>
                            {t('ENewPortfolioItem')}. {t('ETestYourKnowledge')};{' '}
                            {t('EQuizAppIntro')}
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
