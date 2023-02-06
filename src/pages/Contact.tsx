import { useTheme } from '../hooks/useTheme'
import Hero from '../components/Hero/Hero'
import FormMulti from '../components/FormMulti/FormMulti'

export default function Contact({ heading, text, type }: { heading: string; text: string; type: string }) {

    const lightTheme = useTheme()

    return (
        <div className={`${heading} ${type}`}>
            <Hero heading={heading} text={text} />
            <div className='inner-wrap'>
                <section className='card' style={{ position: 'relative', zIndex: '2' }}><div>
                    <FormMulti />
                </div></section>
            </div>
        </div>
    )
}
