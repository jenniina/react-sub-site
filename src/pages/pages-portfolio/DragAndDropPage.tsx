
import { DragAndDrop } from '../../components/DragAndDrop/components'
import Hero from '../../components/Hero/Hero'
import { MdOutlineDragIndicator } from 'react-icons/md'

export default function DragAndDropPage({ heading, text, type }: { heading: string; text: string; type: string }) {

    return (
        <div className={`${heading} ${type}`}>
            <Hero heading={heading} text={text} />
            <div className='inner-wrap'>
                <section className="card">
                    <div>
                        <div className="medium">
                            <h2>Features</h2>
                            <ul className='ul'>
                                <li>draggable with any pointer</li>
                                <li>keyboard use with dropdown list</li>
                                <li>can be rearranged within their container</li>
                                <li>state saved in localStorage</li>
                            </ul>
                            <h3>Instructions</h3>
                            <h4>Pointer and Touch Use</h4>
                            <ul className='ul'>
                                <li>hold pointer button down to drag an item from one container to another, or rearrange within a container</li>
                                <li>on touch devices, hold touch for a moment to activate drag</li>
                                <li>you may also use the item menu <MdOutlineDragIndicator aria-hidden="true" style={{ display: 'inline-block', marginBottom: '-0.15em' }} /> to choose a destination</li>
                            </ul>
                            <h4>Keyboard Use</h4>
                            <ul className='ul'>
                                <li>Move items within their container with the Up or Down arrow keys</li>
                                <li>To move items to another container:
                                    <ul>
                                        <li>use TAB-key to navigate to drag button <MdOutlineDragIndicator aria-hidden="true" style={{ display: 'inline-block', marginBottom: '-0.15em' }} /> and press Enter key to open menu</li>
                                        <li>With the menu open, use TAB-key to navigate and choose new destination with Enter or Space key</li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                        <h2>Drag and Drop</h2>
                        <p>Sort the colors to a different container or organize them within their container</p>
                        <DragAndDrop />
                    </div>
                </section>
            </div>
        </div>
    )
}
