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
      name: t('SimpleWordPressWebsite'),
      price: 190,
      description: `${t('AnAccessibleSinglePageWebsite')} ${t('MayContainEffects')}`,
    },
    {
      id: 'wordpress-website',
      name: t('WordPressWebsite'),
      price: 260,
      description: `${t('AnAccessibleMultiPageWebsite')}  ${t('MayContainEffects')}`,
    },
    {
      id: 'wordpress-blog-contact',
      name: t('WordPressWebsiteWithBlogAndContactForm'),
      price: 350,
      description: `${t('AnAccessibleWebsiteWithBlogAndContactForm')} ${t(
        'TheBlogSectionCanBeNewsArticlesEtc'
      )}`,
    },
    {
      id: 'wordpress-full',
      name: t('WordPressFullPackage'),
      price: 890,
      description: `${t(
        'AnAccessibleWebsiteWithBlogContactFormAndOnlineStoreWooCommerce'
      )}`,
    },
    {
      id: 'wordpress-blog-contact-existing',
      name: `${t('BlogAndContactForm')} `,
      price: 160,
      description: `${t('AddingABlogAndContactFormToAnExistingWebsite')} (${t(
        'WordPressWebsite'
      )}).  ${t('AddonsAreAdaptedToTheStyle')} ${t(
        'TheBlogSectionCanBeNewsArticlesEtc'
      )}`,
    },
    {
      id: 'wordpress-webstore',
      name: `${t('WebStore')}`,
      price: 580,
      description: `${t('AddingAWebStoreToAnExistingWebsite')}. ${t(
        'AddonsAreAdaptedToTheStyle'
      )}`,
    },
  ]

  const react: Partial<ICartItem>[] = [
    {
      id: 'react-simple',
      name: t('SimpleReactWebsite'),
      price: 340,
      description: `${t('AnAccessibleSinglePageWebsite')} ${t('MayContainEffects')}`,
    },
    {
      id: 'react-website',
      name: t('ReactWebsite'),
      price: 400,
      description: `${t('AnAccessibleMultiPageWebsite')} ${t('MayContainEffects')}`,
    },
    {
      id: 'react-contact-functionality',
      name: t('ReactWebsiteWithContactFormAndOtherFunctionality'),
      price: 620,
      description: `${t('AnAccessibleWebsiteWithContactFormAndOtherFunctionality')} ${t(
        'FunctionalitiesCanBe'
      )} (Node.js app & React). ${t(
        'PleaseSeeThePortfolioPagesForExamplesofPossibleFeatures'
      )}`,
    },
    {
      id: 'react-adding-functionality',
      name: `${t('AddingFunctionalityToAReactSite')} (Node.js app & React)`,
      price: 220,
      description: `${t('FunctionalitiesCanBe')} ${t('AddonsAreAdaptedToTheStyle')} ${t(
        'PleaseSeeThePortfolioPagesForExamplesofPossibleFeatures'
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
      name: t('WebsiteMaintenance'),
      id: 'misc-maintenance',
      price: miscArray.maintenance.price,
      description: `${t('WebsiteMaintenance')}: ${miscArray.maintenance.price}€/${t(
        'HourSmall'
      )} ${t('ForWordPressOrReactNodeBasedWebsites')}. `,
    },
    {
      name: t('WebsiteContentUpdatesOrModifications'),
      id: 'misc-updates',
      price: miscArray.updates.price,
      description: `${t('WebsiteContentUpdatesOrModifications')}: ${
        miscArray.updates.price
      }€/${t('HourSmall')} ${t('ForWordPressOrReactNodeBasedWebsites')}. `,
    },
    {
      name: t('TranslationWork'),
      id: 'misc-translation',
      price: miscArray.translation.price,
      description: `${t('TranslationWork')}: ${miscArray.translation.price}€/${t(
        'HourSmall'
      )}. `,
    },
    {
      name: t('TrainingInWebsiteManagement'),
      id: 'misc-training',
      price: miscArray.training.price,
      description: `${t('ForSitesByJenniina')}: ${t(
        'TrainingInWebsiteManagementDescription'
      )} ${miscArray.training.price}€/${t('HourSmall')}. \n\n${t('Note')} ${t(
        'OneHourOfTrainingIncluded'
      )} `,
    },
    {
      name: t('RequestForQuote'),
      id: 'misc-quote',
      price: 0,
      description: `${t('RequestForQuoteForProductsNotInStore')}. \n\n${t(
        'EGInfographicsOrMotionGraphics'
      )}. ${
        language !== ELanguages.en && language !== ELanguages.fi
          ? `\n\n${t(
              'PleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo'
            )}`
          : ''
      }`,
    },
  ]

  const graphicDesign: Partial<ICartItem>[] = [
    {
      id: 'graphic-flyer-1',
      name: `${t('FlyerDesign')} 1`,
      price: 230,
      description: `${t('OneSided')}. ${t(
        'IncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },

    {
      id: 'graphic-flyer-2',
      name: `${t('FlyerDesign')} 2`,
      price: 270,
      description: `${t('TwoSided')}. ${t(
        'IncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-business-card-1',
      name: `${t('BusinessCardDesign')} 1`,
      price: 220,
      description: `${t('OneSidedBusinessCard')}. ${t(
        'IncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-business-card-2',
      name: `${t('BusinessCardDesign')} 2`,
      price: 320,
      description: `${t('TwoSidedBusinessCard')}. ${t(
        'IncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-poster',
      name: t('PosterDesign'),
      price: 290,
      description: `${t(
        'IncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-programme',
      name: t('ProgrammeDesign'),
      price: 320,
      description: `${t('FourPageA5SizeProgramme')}. ${t(
        'IncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-poster-programme',
      name: t('PosterAndProgramme'),
      price: 400,
      description: `${t('PosterAndProgrammeCombo')}. ${t(
        'IncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
      )}`,
    },
    {
      id: 'graphic-logo',
      name: t('LogoDesign'),
      price: 250,
      description: `${t('IncludesPrintableAndWebVersionOfTheLogo')} ${t(
        'IncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts'
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
      name: t('Websites'),
      id: 'misc',
      array: itemsMisc,
      intro:
        language !== ELanguages.fi && language !== ELanguages.en
          ? `${t('IfYouAreUnsureAboutReactOrWordPress')} ${t(
              'PleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo'
            )}`
          : `${t('IfYouAreUnsureAboutReactOrWordPress')}`,
      link: <Link to='/contact'>{t('ContactForm')}</Link>,
    },
    {
      name: 'React & Node',
      id: 'react',
      array: itemsReact,
      intro: `${t('ReactSitesAppsAreFastAndResponsive')}`,
      link: null,
    },
    {
      name: 'WordPress',
      id: 'wordpress',
      array: itemsWordPress,
      intro: `${t('WordPressSitesAreVersatile')} ${t('UpdatingWordPressIsSimple')}`,
      link: (
        <>
          {t('ExampleSites')} ({t('MainSite').toLowerCase()}):
          <ul className='ul'>
            <li>
              <a href='https://jenniina.fi/jyvaskylan-salonkiorkesteri-orchestra-website/#title'>
                {t('OrchestraWebsite')}
              </a>{' '}
            </li>
            <li>
              <a href='https://jenniina.fi/metal-2022/#metal2022'>
                {t('ConferenceWebsite')}
              </a>{' '}
            </li>
            <li>
              <a href='https://jenniina.fi/website-of-psychologist/#sirkku'>
                {t('PsychologistWebsite')}
              </a>
            </li>
          </ul>
        </>
      ),
    },
    {
      name: t('GraphicDesign'),
      id: 'graphic',
      array: itemsGraphic,
      intro: '',
      link: (
        <>
          {t('Products')} ({t('MainSite').toLowerCase()}):{' '}
          <a href='https://jenniina.fi/portfolio#graphic-design'>
            {t('GraphicDesign')} ({t('SampleArtwork')})
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
