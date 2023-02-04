import emailjs from 'emailjs-com';
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from '../components/FormMulti/keys'

//usage
//give form a ref:
//const form = useRef() as RefObject<HTMLFormElement>
//in form:
//onSubmit={e => useEmail(e, form.current)}

export default function useEmail(e: React.FormEvent<HTMLFormElement>, ref: HTMLFormElement | null) {
    e.preventDefault();


    if (ref)
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, ref, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    ref?.current.reset()
};