import { Link } from 'react-router-dom'
import styles from '../../pages/css/welcome.module.css'
import { BiSolidColorFill } from 'react-icons/bi'
import { RiFileList3Line } from 'react-icons/ri'
import { LiaNewspaperSolid } from 'react-icons/lia'

import { useLanguageContext } from '../../contexts/LanguageContext'

export default function Newest() {
  const { t } = useLanguageContext()

  return (
    <div className={`${styles.newest}`}>
      <h2 className={`${styles.subheading}`}>
        <LiaNewspaperSolid /> {t('ChangeLog')}
      </h2>
      <ul className={`${styles.extras}`}>
        <li className={styles.first}>
          <strong>2025</strong>
          <ul>
            <li>
              <strong>{t('September')}</strong>
              <ul>
                <li>
                  <Link to="/portfolio/colors">
                    <BiSolidColorFill />
                    {t('ColorAccessibility')}:
                  </Link>
                  <i>
                    {t('BugFixes')}. {t('Optimizing')}
                  </i>
                </li>
                <li>
                  <span className="disabled">
                    <RiFileList3Line />
                    SEO:
                  </span>
                  <i>{t('Edited')}</i>
                </li>
              </ul>
            </li>
            {/* <li>
              <strong>{t('March')}</strong>
              <ul>
                <li>
                  <Link to='/cart'>
                    <FaStoreAlt /> <BsCart2 />
                    {t('Store')} & {t('Cart')}:
                  </Link>
                  <i>
                    {t('Edited')}: {t('HeroSection')}
                  </i>
                </li>
                <li>
                  <a className='disabled'>
                    <PiWrench />
                    <span>{firstToUpperCase(t('ThisSite'))}: </span>
                  </a>
                  <i>{t('RefactoredTranslations')}</i>
                </li>
                <li>
                  <Link to='/cart'>
                    <BsCart2 />
                    {t('Cart')}:
                  </Link>
                  <i>{t('BugFixes')}</i>
                </li>
              </ul>
            </li>
            <li>
              <strong>{t('February')}</strong>
              <ul>
                <li>
                  <Link to='/portfolio/media'>
                    <IoMdImages />
                    {t('Media')}:
                  </Link>
                  <i>{t('ChangedQuotesAPI')}</i>
                </li>
              </ul>
            </li> */}
          </ul>
        </li>
        {/* <li className={styles.first}>
          <strong>2024</strong>
          <ul>
            <li>
              <strong>{t('December')}</strong>
              <ul>
                <li>
                  <a className='disabled'>
                    <LuArrowRightToLine />
                    <span>{t('SiteMigration')}: </span>
                  </a>
                  <i>{t('MovedBackendFromAzureToMyOwnDomain')}</i>
                </li>
                <li>
                  <Link to='/portfolio/todo'>
                    <RiTodoLine />
                    {t('TodoApp')}:
                  </Link>{' '}
                  <i>
                    {t('AddedNewFeatures')}: {firstToLowerCase(t('Priority'))} &{' '}
                    {firstToLowerCase(t('CategoryTitle'))}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/media'>
                    <IoMdImages />
                    {t('Media')}:
                  </Link>
                  <i>
                    {t('NewPortfolioItem')}: {t('MediaWithQuotesOrPoems')}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/colors'>
                    <BiSolidColorFill />
                    {t('ColorAccessibility')}:
                  </Link>
                  <i>
                    {t('AddedNewFeatures')}: {t('GenerateColors')}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/memory'>
                    <MemorySVG size='32' />
                    {t('MemoryGame')}:
                  </Link>
                  <i>
                    {t('NewPortfolioItem')}: {t('MemoryGameIntro')}
                  </i>
                </li>
              </ul>
            </li>
            <li>
              <strong>{t('November')}</strong>
              <ul>
                <li>
                  <Link to='/portfolio/blob'>
                    <TbBlob />
                    {t('Blobs')}:
                  </Link>
                  <i>{t('ChangedAllControlsToButtons')}</i>
                </li>
                <li>
                  <Link to='/portfolio/colors'>
                    <BiSolidColorFill />
                    {t('ColorAccessibility')}:
                  </Link>
                  <i>
                    {t('NewPortfolioItem')}: {t('TestColorCombinations')}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/composer'>
                    <BsMusicNoteBeamed />
                    {t('ComposerOlliSanta')}:
                  </Link>
                  <i>
                    {t('AddedNewIntroElements')} ({t('HeroSection')} )
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/composer'>
                    <BsMusicNoteBeamed />
                    {t('ComposerOlliSanta')}:
                  </Link>
                  <i>
                    {t('NewPortfolioItem')}: {t('AddedALinkToComposer')}
                  </i>
                </li>
                <li>
                  <Link to='/portfolio/draganddrop'>
                    <RiDragDropLine />
                    {t('DragAndDrop')}:
                  </Link>
                  <i>{t('BugFixes')}</i>
                </li>
              </ul>
            </li>
            <li>
              <strong>{t('October')}</strong>
              <ul>
                <li>
                  <Link to='/store'>
                    <FaStoreAlt />
                    {t('Store')}:
                  </Link>
                  <i>{t('LaunchedAnOnlineOrderingSystem')}</i>
                </li>
                <li>
                  <Link to='/terms'>
                    <RiFileList3Line />
                    {t('TermsOfService')}:
                  </Link>
                  <i>
                    {t('Added')}: {t('TermsOfService')} ({t('Page')})
                  </i>
                </li>
              </ul>
            </li>
          </ul>
        </li> */}
      </ul>
      {/* <Accordion
        language={language}
        text={t('OlderNews')}
        className={`${styles.oldernews} oldernews`}
        wrapperClass={styles['oldernews-wrap']}
      >
        <>
          <ul className={`${styles.extras}`}>
            <li>
              <strong>2024</strong>
              <ul>
                <li>
                  <strong>{t('September')}</strong>
                  <ul>
                    <li>
                      <Link to='/portfolio/draganddrop'>
                        <RiDragDropLine />
                        {t('DragAndDrop')}:
                      </Link>
                      <i>
                        {t('AddedNewFeatures')}:{' '}
                        {firstToLowerCase(t('AddGenericCardsAndColorThem'))}
                      </i>
                    </li>

                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('Blobs')}:
                      </Link>
                      <i>
                        {t('AddedNewFeatures')}:{' '}
                        {t('PressSpaceOrRWithABlobInFocusToCycleThroughRandomColors')}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/draganddrop'>
                        <RiDragDropLine />
                        {t('DragAndDrop')}:
                      </Link>
                      <i>
                        {t('AddedNewFeatures')}: {t('Delete').toLowerCase()} (
                        {firstToLowerCase(t('CategoryTitle'))}),{' '}
                        {firstToLowerCase(t('AddANewCategory'))}
                      </i>
                    </li>
                    <li>
                      <a className='disabled'>
                        <TbTriangleInverted />
                        {t('HeroSection')}:
                      </a>{' '}
                      <i>
                        {t('AddedNewFeatures')}: {t('RandomHeadingItemMovement')}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/draganddrop'>
                        <RiDragDropLine />
                        {t('DragAndDrop')}:
                      </Link>
                      <i>
                        {t('BugFixes')}. {t('Accessibility')}:{' '}
                        {t('Optimizing').toLowerCase()}.
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('Blobs')}:
                      </Link>
                      <i>{t('AddedAnotherInstanceOfTheBlobArtApp')} </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('Blobs')}:
                      </Link>
                      <i>
                        {t('SampleArtwork')}. {t('AddedNewFeatures')}:{' '}
                        {t('AddedPaginationToSavedArt')}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('Blobs')}:
                      </Link>
                      <i>
                        {t('AddedNewFeatures')}: {t('Screenshot')}!{' '}
                        {t('MoveEveryBlobUpOrDownOneLayerByPressingTheButtons')}.{' '}
                        {t('DragBlobToIconsNextToLayerButtons')}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/draganddrop'>
                        <RiDragDropLine />
                        {t('DragAndDrop')}:
                      </Link>
                      <i>
                        {t('AddedNewFeatures')}: {firstToLowerCase(t('AddAColor'))},{' '}
                        {firstToLowerCase(t('ChangeCategoryTitle'))},{' '}
                        {firstToLowerCase(t('Reset'))}, {firstToLowerCase(t('Removable'))}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('Blobs')}:
                      </Link>
                      <i>
                        {t('AddedNewFeatures')}:{' '}
                        {firstToLowerCase(t('LoginToSaveBlobsToServer'))},{' '}
                        {firstToLowerCase(t('ManyVersions'))},{' '}
                        {firstToLowerCase(t('NameYourArtwork'))},{' '}
                        {firstToLowerCase(t('RenameYourArtwork'))},{' '}
                        {firstToLowerCase(t('EditArtwork'))}
                      </i>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>{t('August')}</strong>
                  <ul>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('Blobs')}:
                      </Link>
                      <i>
                        {t('AddedNewFeatures')}: {firstToLowerCase(t('Layers'))};{' '}
                        {firstToLowerCase(t('Button'))}:{' '}
                        {firstToLowerCase(t('ToggleControlVisibility'))}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('Blobs')}:
                      </Link>
                      <i>{t('ImprovedAccessibility')}</i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('Blobs')}:
                      </Link>
                      <i>
                        {t('AddedNewFeatures')}:{' '}
                        {firstToLowerCase(t('MoveViewInDifferentDirections'))} (
                        {firstToLowerCase(t('Buttons'))}). {t('BugFixes')}.
                      </i>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>{t('July')}</strong>
                  <ul>
                    <li>
                      <a className='disabled'>
                        <LuArrowRightToLine />
                        <span>{t('SiteMigration')}: </span>
                      </a>
                      <i>{t('MigratedSiteToAnotherAzureSubscription')}</i>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>{t('February')}</strong>
                  <ul>
                    <li>
                      <Link to='/portfolio/graphql'>
                        <GrGraphQl />
                        <span>{t('GraphQLSite')}</span>
                      </Link>
                      <i>{t('NewPortfolioItem')}</i>
                    </li>
                    <li>
                      <Link to='/portfolio/quiz'>
                        <TbTriangleInverted />
                        {t('HeroSection')}:
                      </Link>{' '}
                      <i>{t('AddedNewIntroElements')}</i>
                    </li>
                    <li>
                      <Link to='/portfolio/salon'>
                        <GiComb />
                        {t('HairSalonWebsite')}:
                      </Link>{' '}
                      <i>Parturi Kampaamo Hannastiina</i>
                    </li>
                    <li>
                      <Link to='/portfolio/blob'>
                        <TbBlob />
                        {t('Blobs')}:
                      </Link>
                      <i>
                        {t('BugFixes')}. {t('Optimizing')}
                      </i>
                    </li>
                    <li>
                      <Link to='/portfolio/todo'>
                        <RiTodoLine />
                        {t('TodoApp')}:
                      </Link>{' '}
                      <i>
                        {t('AddedNewFeatures')}: {firstToLowerCase(t('TasksCanBeEdited'))}{' '}
                        &{' '}
                        {firstToLowerCase(
                          t('TasksCanBeReorganizedByDraggingAndDropping')
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
                      <strong>{t('December')}</strong>
                      <ul>
                        <li>
                          <Link to='/portfolio/jokes'>
                            <GiAbstract019 />
                            {t('TheComediansCompanion')}:
                          </Link>{' '}
                          <i>
                            {t('AddedNewFeatures')}. {t('Optimizing')}
                          </i>
                        </li>
                      </ul>
                    </li>{' '}
                    <li>
                      <strong>{t('October')}</strong>
                      <ul>
                        <li>
                          <Link to='/portfolio/quiz'>
                            <MdOutlineQuiz />
                            {t('Quiz')}:
                          </Link>{' '}
                          <i>
                            {t('NewPortfolioItem')}. {t('TestYourKnowledge')};{' '}
                            {t('QuizAppIntro')}
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
      </Accordion> */}
    </div>
  )
}
