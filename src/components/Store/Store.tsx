import styles from './store.module.css'
import { ELanguages } from '../../types'
import StoreItems from './components/StoreItems'
import { FC, useContext } from 'react'
import ScrollButton from '../ScrollButton'
import { ICartItem } from '../../types/store'
import { useTheme } from '../../hooks/useTheme'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../contexts/LanguageContext'

interface Props {
  language: ELanguages
  cart: ICartItem[]
  addToCart: (item: ICartItem) => void
  removeFromCart: (itemId: string) => void
}

const Store: FC<Props> = ({ language, cart, addToCart, removeFromCart }) => {
  const { t } = useContext(LanguageContext)!

  const lightTheme = useTheme()

  const wordpress: Partial<ICartItem>[] = [
    {
      id: 'wordpress-simple',
      name: t('ESimpleWordPressWebsite'),
      price: 190,
      description: `${t('EAnAccessibleSinglePageWebsite')} ${t('EMayContainEffects')}`,
    },
    {
      id: 'wordpress-website',
      name: t('EWordPressWebsite'),
      price: 260,
      description: `${t('EAnAccessibleMultiPageWebsite')}  ${t('EMayContainEffects')}`,
    },
    {
      id: 'wordpress-blog-contact',
      name: t('EWordPressWebsiteWithBlogAndContactForm'),
      price: 350,
      description: `${t('EAnAccessibleWebsiteWithBlogAndContactForm')} ${t(
        'ETheBlogSectionCanBeNewsArticlesEtc'
      )}`,
    },
    {
      id: 'wordpress-full',
      name: t('EWordPressFullPackage'),
      price: 890,
      description: `${t(
        'EAnAccessibleWebsiteWithBlogContactFormAndOnlineStoreWooCommerce'
      )}`,
    },
    {
      id: 'wordpress-blog-contact-existing',
      name: `${t('EBlogAndContactForm')} `,
      price: 160,
      description: `${t('EAddingABlogAndContactFormToAnExistingWebsite')} (${t(
        'EWordPressWebsite'
      )}).  ${t('EAddonsAreAdaptedToTheStyle')} ${t(
        'ETheBlogSectionCanBeNewsArticlesEtc'
      )}`,
    },
    {
      id: 'wordpress-webstore',
      name: `${t('EWebStore')}`,
      price: 580,
      description: `${t('EAddingAWebStoreToAnExistingWebsite')}. ${t(
        'EAddonsAreAdaptedToTheStyle'
      )}`,
    },
  ]

  const react: Partial<ICartItem>[] = [
    {
      id: 'react-simple',
      name: t('ESimpleReactWebsite'),
      price: 340,
      description: `${t('EAnAccessibleSinglePageWebsite')} ${t('EMayContainEffects')}`,
    },
    {
      id: 'react-website',
      name: t('EReactWebsite'),
      price: 400,
      description: `${t('EAnAccessibleMultiPageWebsite')} ${t('EMayContainEffects')}`,
    },
    {
      id: 'react-contact-functionality',
      name: t('EReactWebsiteWithContactFormAndOtherFunctionality'),
      price: 620,
      description: `${t('EAnAccessibleWebsiteWithContactFormAndOtherFunctionality')} ${t(
        'EFunctionalitiesCanBe'
      )} (Node.js app & React). ${t(
        'EPleaseSeeThePortfolioPagesForExamplesofPossibleFeatures'
      )}`,
    },
    {
      id: 'react-adding-functionality',
      name: `${t('EAddingFunctionalityToAReactSite')} (Node.js app & React)`,
      price: 220,
      description: `${t('EFunctionalitiesCanBe')} ${t('EAddonsAreAdaptedToTheStyle')} ${t(
        'EPleaseSeeThePortfolioPagesForExamplesofPossibleFeatures'
      )}`,
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
      name: t('EWebsiteMaintenance'),
      id: 'misc-maintenance',
      price: miscArray.maintenance.price,
      description: `${t('EWebsiteMaintenance')}: ${miscArray.maintenance.price}€/${t(
        'EHourSmall'
      )} ${t('EForWordPressOrReactNodeBasedWebsites')}. `,
    },
    {
      name: t('EWebsiteContentUpdatesOrModifications'),
      id: 'misc-updates',
      price: miscArray.updates.price,
      description: `${t('EWebsiteContentUpdatesOrModifications')}: ${
        miscArray.updates.price
      }€/${t('EHourSmall')} ${t('EForWordPressOrReactNodeBasedWebsites')}. `,
    },
    {
      name: t('ETranslationWork'),
      id: 'misc-translation',
      price: miscArray.translation.price,
      description: `${t('ETranslationWork')}: ${miscArray.translation.price}€/${t(
        'EHourSmall'
      )}. `,
    },
    {
      name: t('ETrainingInWebsiteManagement'),
      id: 'misc-training',
      price: miscArray.training.price,
      description: `${t('EForSitesByJenniina')}: ${t(
        'ETrainingInWebsiteManagementDescription'
      )} ${miscArray.training.price}€/${t('EHourSmall')}. \n\n${t('ENote')} ${t(
        'EOneHourOfTrainingIncluded'
      )} `,
    },
    {
      name: t('ERequestForQuote'),
      id: 'misc-quote',
      price: 0,
      description: `${t('ERequestForQuoteForProductsNotInStore')}. \n\n${t(
        'EEGInfographicsOrMotionGraphics'
      )}. ${
        language !== ELanguages.en && language !== ELanguages.fi
          ? `\n\n${t(
              'EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo'
            )}`
          : ''
      }`,
    },
  ]

  const graphicDesign: Partial<ICartItem>[] = [
    {
      id: 'graphic-flyer-1',
      name: `${t('EFlyerDesign')} 1`,
      price: 230,
      description: `${t('EOneSided')}. ${t(
        'EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },

    {
      id: 'graphic-flyer-2',
      name: `${t('EFlyerDesign')} 2`,
      price: 270,
      description: `${t('ETwoSided')}. ${t(
        'EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-business-card-1',
      name: `${t('EBusinessCardDesign')} 1`,
      price: 220,
      description: `${t('EOneSidedBusinessCard')}. ${t(
        'EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-business-card-2',
      name: `${t('EBusinessCardDesign')} 2`,
      price: 320,
      description: `${t('ETwoSidedBusinessCard')}. ${t(
        'EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-poster',
      name: t('EPosterDesign'),
      price: 290,
      description: `${t(
        'EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-programme',
      name: t('EProgrammeDesign'),
      price: 320,
      description: `${t('EFourPageA5SizeProgramme')}. ${t(
        'EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-poster-programme',
      name: t('EPosterAndProgramme'),
      price: 400,
      description: `${t('EPosterAndProgrammeCombo')}. ${t(
        'EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-logo',
      name: t('ELogoDesign'),
      price: 250,
      description: `${t('EIncludesPrintableAndWebVersionOfTheLogo')} ${t(
        'EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
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
      name: t('EWebsites'),
      id: 'misc',
      array: itemsMisc,
      intro:
        language !== ELanguages.fi && language !== ELanguages.en
          ? `${t('EIfYouAreUnsureAboutReactOrWordPress')} ${t(
              'EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo'
            )}`
          : `${t('EIfYouAreUnsureAboutReactOrWordPress')}`,
      link: <Link to='/contact'>{t('EContactForm')}</Link>,
    },
    {
      name: 'React & Node',
      id: 'react',
      array: itemsReact,
      intro: `${t('EReactSitesAppsAreFastAndResponsive')}`,
      link: null,
    },
    {
      name: 'WordPress',
      id: 'wordpress',
      array: itemsWordPress,
      intro: `${t('EWordPressSitesAreVersatile')} ${t('EUpdatingWordPressIsSimple')}`,
      link: (
        <>
          {t('EExampleSites')} ({t('EMainSite').toLowerCase()}):
          <ul className='ul'>
            <li>
              <a href='https://jenniina.fi/jyvaskylan-salonkiorkesteri-orchestra-website/#title'>
                {t('EOrchestraWebsite')}
              </a>{' '}
            </li>
            <li>
              <a href='https://jenniina.fi/metal-2022/#metal2022'>
                {t('EConferenceWebsite')}
              </a>{' '}
            </li>
            <li>
              <a href='https://jenniina.fi/website-of-psychologist/#sirkku'>
                {t('EPsychologistWebsite')}
              </a>
            </li>
          </ul>
        </>
      ),
    },
    {
      name: t('EGraphicDesign'),
      id: 'graphic',
      array: itemsGraphic,
      intro: '',
      link: (
        <>
          {t('EProducts')} ({t('EMainSite').toLowerCase()}):{' '}
          <a href='https://jenniina.fi/portfolio#graphic-design'>
            {t('EGraphicDesign')} ({t('ESampleArtwork')})
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
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </>
  )
}

export default Store
