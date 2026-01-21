// Static icon imports - only import the specific icons used in the app
import {
  RiHomeSmileLine,
  RiMailSendLine,
  RiDeleteBin2Line,
  RiDragMove2Fill,
  RiDragDropLine,
  RiTodoLine,
  RiFileList3Line,
} from "react-icons/ri"
import {
  BsPerson,
  BsCart2,
  BsMusicNoteBeamed,
  BsArrowDownCircleFill,
  BsArrowBarRight,
  BsArrowBarLeft,
} from "react-icons/bs"
import { IoMdImages, IoMdAdd, IoMdCheckmarkCircleOutline } from "react-icons/io"
import {
  BiChat,
  BiChevronsUp,
  BiChevronsDown,
  BiReset,
  BiSelectMultiple,
  BiSolidColorFill,
} from "react-icons/bi"
import { CgSearch, CgUndo } from "react-icons/cg"
import { IoSettingsSharp, IoPersonCircleSharp } from "react-icons/io5"
import {
  HiOutlineDotsHorizontal,
  HiDotsHorizontal,
  HiDotsCircleHorizontal,
} from "react-icons/hi"
import { TfiLineDashed } from "react-icons/tfi"
import {
  FaAnglesUp,
  FaTriangleExclamation,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6"
import {
  MdLightMode,
  MdDarkMode,
  Md123,
  MdAbc,
  MdInsertEmoticon,
  MdDragIndicator,
  MdWork,
  MdOutlineQuiz,
  MdMoveUp,
  MdMoveDown,
} from "react-icons/md"
import {
  LuCirclePlus,
  LuArrowRightFromLine,
  LuArrowLeftFromLine,
} from "react-icons/lu"
import { LiaUndoAltSolid, LiaNewspaperSolid } from "react-icons/lia"
import { PiImage, PiDownloadSimpleFill } from "react-icons/pi"
import {
  FaStar,
  FaStoreAlt,
  FaWordpress,
  FaReact,
  FaNodeJs,
  FaRegCheckCircle,
  FaHourglassStart,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa"
import { TiDeleteOutline, TiShoppingCart } from "react-icons/ti"
import { AiOutlineEdit, AiOutlineForm } from "react-icons/ai"
import { TbCancel } from "react-icons/tb"
import { ImImages } from "react-icons/im"
import { GrGraphQl } from "react-icons/gr"
import { GiAbstract019, GiComb } from "react-icons/gi"
import { SiSvgtrace } from "react-icons/si"
import { GoArrowLeft, GoArrowRight } from "react-icons/go"

export const iconLibraries: Record<
  string,
  Record<string, React.ComponentType<Record<string, unknown>>>
> = {
  ri: {
    RiHomeSmileLine,
    RiMailSendLine,
    RiDeleteBin2Line,
    RiDragMove2Fill,
    RiDragDropLine,
    RiTodoLine,
    RiFileList3Line,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  bs: {
    BsPerson,
    BsCart2,
    BsMusicNoteBeamed,
    BsArrowDownCircleFill,
    BsArrowBarRight,
    BsArrowBarLeft,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  io: {
    IoMdImages,
    IoMdAdd,
    IoMdCheckmarkCircleOutline,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  bi: {
    BiChat,
    BiChevronsUp,
    BiChevronsDown,
    BiReset,
    BiSelectMultiple,
    BiSolidColorFill,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  cg: {
    CgSearch,
    CgUndo,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  io5: {
    IoSettingsSharp,
    IoPersonCircleSharp,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  hi: {
    HiOutlineDotsHorizontal,
    HiDotsHorizontal,
    HiDotsCircleHorizontal,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  tfi: {
    TfiLineDashed,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  fa6: {
    FaAnglesUp,
    FaTriangleExclamation,
    FaAnglesLeft,
    FaAnglesRight,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  md: {
    MdLightMode,
    MdDarkMode,
    Md123,
    MdAbc,
    MdInsertEmoticon,
    MdDragIndicator,
    MdWork,
    MdOutlineQuiz,
    MdMoveUp,
    MdMoveDown,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  lu: {
    LuCirclePlus,
    LuArrowRightFromLine,
    LuArrowLeftFromLine,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  lia: {
    LiaUndoAltSolid,
    LiaNewspaperSolid,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  pi: {
    PiImage,
    PiDownloadSimpleFill,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  fa: {
    FaStar,
    FaStoreAlt,
    FaWordpress,
    FaReact,
    FaNodeJs,
    FaRegCheckCircle,
    FaHourglassStart,
    FaArrowLeft,
    FaArrowRight,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  ti: {
    TiDeleteOutline,
    TiShoppingCart,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  ai: {
    AiOutlineEdit,
    AiOutlineForm,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  tb: {
    TbCancel,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  im: {
    ImImages,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  gr: {
    GrGraphQl,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  gi: {
    GiAbstract019,
    GiComb,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  si: {
    SiSvgtrace,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
  go: {
    GoArrowLeft,
    GoArrowRight,
  } as Record<string, React.ComponentType<Record<string, unknown>>>,
}
