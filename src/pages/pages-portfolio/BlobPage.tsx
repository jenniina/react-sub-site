import BlobJS from '../../components/Blob/blobJS'
import Hero from '../../components/Hero/Hero'
import './css/blob.css'

export default function BlobPage({
  heading,
  text,
  type,
}: {
  heading: string
  text: string
  type: string
}) {
  return (
    <div
      className={`${heading
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/[^a-zA-Z]/g, '')} ${type}`}
    >
      <Hero heading={heading} text={text} />
      <div className='inner-wrap'>
        <section>
          <div className='card'>
            <div>
              <div className='medium'>
                <h2>Features</h2>
                <ul className='ul'>
                  <li>
                    Blobs:
                    <ul>
                      <li>Draggable</li>
                      <li>Blur into one another</li>
                      <li>Changeable color </li>
                      <li>Changeable size </li>
                      <li>Cloneable</li>
                      <li>Removable</li>
                    </ul>
                  </li>

                  <li>
                    Sliders to control background
                    <ul>
                      <li>Lightness</li>
                      <li>Saturation</li>
                      <li>Hue</li>
                    </ul>
                  </li>

                  <li>
                    Buttons to
                    <ul>
                      <li>Toggle the subtle movement of the blobs</li>
                      <li>Reset the blob array to a new configuration</li>
                      <li>Stop scrolling behavior to use the mouse wheel freely</li>
                    </ul>
                  </li>

                  <li>Top left shows which blob is currently active</li>
                </ul>
                <h3>Instructions</h3>
                <h4>Pointer Use</h4>
                <ul className='ul'>
                  <li>Change blob color by dragging to a color node on the sides</li>
                  <li>
                    Change blob size by dragging it to one of the corners on the right
                    hand side
                  </li>
                  <li>
                    Change blob size by scrolling with the mouse wheel (note: you may want
                    to disable scrolling first with the button on the top right)
                  </li>
                  <li>Clone a blob by dragging it to the top left corner</li>
                  <li>Remove a blob by dragging it to the bottom left corner</li>
                </ul>
                <h4>Keyboard Use</h4>
                <ul className='ul'>
                  <li>
                    Tab to a blob, and with it in focus:
                    <ul>
                      <li>Press Enter to cycle through the different colors</li>
                      <li>Make blob smaller by pressing '1'</li>
                      <li>Make blob larger by pressing '2'</li>
                      <li>Clone a blob by pressing '3' or '+'</li>
                      <li>Remove a blob by pressing 'Delete' or '-'</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <BlobJS />
      </div>
    </div>
  )
}
