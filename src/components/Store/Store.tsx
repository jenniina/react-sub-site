import styles from './store.module.css'
import { ELanguages, EMainSite } from '../../interfaces'
import StoreItems from './components/StoreItems'
import { FC } from 'react'
import ScrollButton from '../ScrollButton'
import {
  EAddingABlogAndContactFormToAnExistingWebsite,
  EAddingAWebStoreToAnExistingWebsite,
  EAnAccessibleMultiPageWebsite,
  EAnAccessibleSinglePageWebsite,
  EAnAccessibleWebsiteWithBlogAndContactForm,
  EAnAccessibleWebsiteWithContactFormAndOtherFunctionality,
  EAnAccessibleWebsiteWithBlogContactFormAndOnlineStoreWooCommerce,
  EBusinessCardDesign,
  EForWordPressOrReactNodeBasedWebsites,
  EGraphicDesign,
  EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts,
  EIncludesPrintableAndWebVersionOfTheLogo,
  ELogoDesign,
  EHour,
  EProducts,
  EReactWebsite,
  EReactWebsiteWithContactFormAndOtherFunctionality,
  ERequestForQuote,
  ERequestForQuoteForProductsNotInStore,
  ESimpleReactWebsite,
  ESimpleWordPressWebsite,
  EWordPressWebsiteWithBlogAndContactForm,
  ETranslationWork,
  EWebsiteMaintenance,
  EWebsites,
  EWebsiteContentUpdatesOrModifications,
  EWordPressFullPackage,
  EWordPressWebsite,
  ICartItem,
  EPosterDesign,
  EFlyerDesign,
  EFourPageA5SizeProgramme,
  EProgrammeDesign,
  EOneSided,
  ETwoSided,
  EReactSitesAppsAreFastAndResponsive,
  EWordPressSitesAreVersatile,
  EUpdatingWordPressIsSimple,
  EAddingFunctionalityToAReactSite,
  EFunctionalitiesCanBe,
  EIfYouAreUnsureAboutReactOrWordPress,
  EOneSidedBusinessCard,
  ETwoSidedBusinessCard,
  ETrainingInWebsiteManagement,
  ETrainingInWebsiteManagementDescription,
  EOneHourOfTrainingIncluded,
  EForSitesByJenniina,
  EEGInfographicsOrMotionGraphics,
  EPosterAndProgrammeCombo,
  ETheBlogSectionCanBeNewsArticlesEtc,
  EOrchestraWebsite,
  EConferenceWebsite,
  EExampleSites,
  EPsychologistWebsite,
  EPleaseSeeThePortfolioPagesForExamplesofPossibleFeatures,
  EPosterAndProgramme,
  EWebStore,
  EBlogAndContactForm,
  EAddonsAreAdaptedToTheStyle,
  EMayContainEffects,
} from '../../interfaces/store'
import { EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo } from '../../interfaces/about'
import { useTheme } from '../../hooks/useTheme'
import { Link } from 'react-router-dom'
import { EContactForm } from '../../interfaces/form'
import { ESampleArtwork } from '../../interfaces/blobs'
import { ENote } from '../Jokes/interfaces'

interface Props {
  language: ELanguages
  cart: ICartItem[]
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>
}

const Store: FC<Props> = ({ language, cart, setCart }) => {
  const lightTheme = useTheme()

  const wordpress: Partial<ICartItem>[] = [
    {
      id: 'wordpress-simple',
      name: ESimpleWordPressWebsite[language],
      price: 190,
      description: `${EAnAccessibleSinglePageWebsite[language]} ${EMayContainEffects[language]}`,
    },
    {
      id: 'wordpress-website',
      name: EWordPressWebsite[language],
      price: 260,
      description: `${EAnAccessibleMultiPageWebsite[language]}  ${EMayContainEffects[language]}`,
    },
    {
      id: 'wordpress-blog-contact',
      name: EWordPressWebsiteWithBlogAndContactForm[language],
      price: 350,
      description: `${EAnAccessibleWebsiteWithBlogAndContactForm[language]} ${ETheBlogSectionCanBeNewsArticlesEtc[language]}`,
    },
    {
      id: 'wordpress-full',
      name: EWordPressFullPackage[language],
      price: 890,
      description: `${EAnAccessibleWebsiteWithBlogContactFormAndOnlineStoreWooCommerce[language]}`,
    },
    {
      id: 'wordpress-blog-contact-existing',
      name: `${EBlogAndContactForm[language]} `,
      price: 160,
      description: `${EAddingABlogAndContactFormToAnExistingWebsite[language]} (${EWordPressWebsite[language]}).  ${EAddonsAreAdaptedToTheStyle[language]} ${ETheBlogSectionCanBeNewsArticlesEtc[language]}`,
    },
    {
      id: 'wordpress-webstore',
      name: `${EWebStore[language]}`,
      price: 580,
      description: `${EAddingAWebStoreToAnExistingWebsite[language]}. ${EAddonsAreAdaptedToTheStyle[language]}`,
    },
  ]

  const react: Partial<ICartItem>[] = [
    {
      id: 'react-simple',
      name: ESimpleReactWebsite[language],
      price: 340,
      description: `${EAnAccessibleSinglePageWebsite[language]} ${EMayContainEffects[language]}`,
    },
    {
      id: 'react-website',
      name: EReactWebsite[language],
      price: 400,
      description: `${EAnAccessibleMultiPageWebsite[language]} ${EMayContainEffects[language]}`,
    },
    {
      id: 'react-contact-functionality',
      name: EReactWebsiteWithContactFormAndOtherFunctionality[language],
      price: 620,
      description: `${EAnAccessibleWebsiteWithContactFormAndOtherFunctionality[language]} ${EFunctionalitiesCanBe[language]} (Node.js app & React). ${EPleaseSeeThePortfolioPagesForExamplesofPossibleFeatures[language]}`,
    },
    {
      id: 'react-adding-functionality',
      name: `${EAddingFunctionalityToAReactSite[language]} (Node.js app & React)`,
      price: 220,
      description: `${EFunctionalitiesCanBe[language]} ${EAddonsAreAdaptedToTheStyle[language]} ${EPleaseSeeThePortfolioPagesForExamplesofPossibleFeatures[language]}`,
    },
  ]

  const hourlyRateM = 26
  const hourlyRateU = 28
  const hourlyRateT = 33

  const miscArray = {
    maintenance: { price: hourlyRateM },
    updates: { price: hourlyRateU },
    translation: { price: hourlyRateT },
    training: { price: hourlyRateT },
  }

  const misc: Partial<ICartItem>[] = [
    {
      name: EWebsiteMaintenance[language],
      id: 'misc-maintenance',
      price: miscArray.maintenance.price,
      description: `${EWebsiteMaintenance[language]}: ${miscArray.maintenance.price}€/${EHour[language]} ${EForWordPressOrReactNodeBasedWebsites[language]}. `,
    },
    {
      name: EWebsiteContentUpdatesOrModifications[language],
      id: 'misc-updates',
      price: miscArray.updates.price,
      description: `${EWebsiteContentUpdatesOrModifications[language]}: ${miscArray.updates.price}€/${EHour[language]} ${EForWordPressOrReactNodeBasedWebsites[language]}. `,
    },
    {
      name: ETranslationWork[language],
      id: 'misc-translation',
      price: miscArray.translation.price,
      description: `${ETranslationWork[language]}: ${miscArray.translation.price}€/${EHour[language]}. `,
    },
    {
      name: ETrainingInWebsiteManagement[language],
      id: 'misc-training',
      price: miscArray.training.price,
      description: `${EForSitesByJenniina[language]}: ${ETrainingInWebsiteManagementDescription[language]} ${miscArray.training.price}€/${EHour[language]}. \n\n${ENote[language]} ${EOneHourOfTrainingIncluded[language]} `,
    },
    {
      name: ERequestForQuote[language],
      id: 'misc-quote',
      price: 0,
      description: `${ERequestForQuoteForProductsNotInStore[language]}. \n\n${
        EEGInfographicsOrMotionGraphics[language]
      }. ${
        language !== ELanguages.English && language !== ELanguages.Suomi
          ? `\n\n${EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo[language]}`
          : ''
      }`,
    },
  ]

  const graphicDesign: Partial<ICartItem>[] = [
    {
      id: 'graphic-flyer-1',
      name: `${EFlyerDesign[language]} 1`,
      price: 230,
      description: `${EOneSided[language]}. ${EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts[language]}`,
    },

    {
      id: 'graphic-flyer-2',
      name: `${EFlyerDesign[language]} 2`,
      price: 270,
      description: `${ETwoSided[language]}. ${EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts[language]}`,
    },
    {
      id: 'graphic-business-card-1',
      name: `${EBusinessCardDesign[language]} 1`,
      price: 220,
      description: `${EOneSidedBusinessCard[language]}. ${EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts[language]}`,
    },
    {
      id: 'graphic-business-card-2',
      name: `${EBusinessCardDesign[language]} 2`,
      price: 320,
      description: `${ETwoSidedBusinessCard[language]}. ${EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts[language]}`,
    },
    {
      id: 'graphic-poster',
      name: EPosterDesign[language],
      price: 290,
      description: `${EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts[language]}`,
    },
    {
      id: 'graphic-programme',
      name: EProgrammeDesign[language],
      price: 320,
      description: `${EFourPageA5SizeProgramme[language]}. ${EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts[language]}`,
    },
    {
      id: 'graphic-poster-programme',
      name: EPosterAndProgramme[language],
      price: 400,
      description: `${EPosterAndProgrammeCombo[language]}. ${EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts[language]}`,
    },
    {
      id: 'graphic-logo',
      name: ELogoDesign[language],
      price: 250,
      description: `${EIncludesPrintableAndWebVersionOfTheLogo[language]} ${EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts[language]}`,
    },
  ]

  const itemsReact = react.map((item) => {
    item.quantity = 0
    item.details = ''
    item.status = 'pending'
    item.paid = 'none'
    return item
  }) as ICartItem[]

  const itemsWordPress = wordpress.map((item) => {
    item.quantity = 0
    item.details = ''
    item.status = 'pending'
    item.paid = 'none'
    return item
  }) as ICartItem[]

  const itemsGraphic = graphicDesign.map((item) => {
    item.quantity = 0
    item.details = ''
    item.status = 'pending'
    item.paid = 'none'
    return item
  }) as ICartItem[]

  const itemsMisc = misc.map((item) => {
    item.quantity = 0
    item.details = ''
    item.status = 'pending'
    item.paid = 'none'
    return item
  }) as ICartItem[]

  const itemsNameArray = [
    {
      name: EWebsites[language],
      id: 'misc',
      array: itemsMisc,
      intro:
        language !== ELanguages.Suomi && language !== ELanguages.English
          ? `${EIfYouAreUnsureAboutReactOrWordPress[language]} ${EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo[language]}`
          : `${EIfYouAreUnsureAboutReactOrWordPress[language]}`,
      link: <Link to='/contact'>{EContactForm[language]}</Link>,
    },
    {
      name: 'React & Node',
      id: 'react',
      array: itemsReact,
      intro: `${EReactSitesAppsAreFastAndResponsive[language]}`,
      link: null,
    },
    {
      name: 'WordPress',
      id: 'wordpress',
      array: itemsWordPress,
      intro: `${EWordPressSitesAreVersatile[language]} ${EUpdatingWordPressIsSimple[language]}`,
      link: (
        <>
          {EExampleSites[language]} ({EMainSite[language].toLowerCase()}):
          <ul className='ul'>
            <li>
              <a href='https://jenniina.fi/jyvaskylan-salonkiorkesteri-orchestra-website/#title'>
                {EOrchestraWebsite[language]}
              </a>{' '}
            </li>
            <li>
              <a href='https://jenniina.fi/metal-2022/#metal2022'>
                {EConferenceWebsite[language]}
              </a>{' '}
            </li>
            <li>
              <a href='https://jenniina.fi/website-of-psychologist/#sirkku'>
                {EPsychologistWebsite[language]}
              </a>
            </li>
          </ul>
        </>
      ),
    },
    {
      name: EGraphicDesign[language],
      id: 'graphic',
      array: itemsGraphic,
      intro: '',
      link: (
        <>
          {EProducts[language]} ({EMainSite[language].toLowerCase()}):{' '}
          <a href='https://jenniina.fi/portfolio#graphic-design'>
            {EGraphicDesign[language]} ({ESampleArtwork[language]})
          </a>
        </>
      ),
    },
  ]

  return (
    <>
      <div
        className={`${styles['scroll-button-wrap']} ${lightTheme ? styles.light : ''}`}
      >
        {itemsNameArray.map((item, index) =>
          index === 0 ? null : (
            <ScrollButton
              key={item.id}
              styles={styles}
              name={item.name}
              id={item.id}
              direction='below'
            />
          )
        )}{' '}
      </div>
      {itemsNameArray.map((item) => (
        <StoreItems
          key={item.id}
          id={item.id}
          language={language}
          items={item.array}
          name={item.name}
          intro={item.intro}
          link={item.link}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </>
  )
}

export default Store
