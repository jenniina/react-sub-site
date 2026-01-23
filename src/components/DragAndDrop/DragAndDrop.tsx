import {
  useState,
  useMemo,
  FormEvent,
  useEffect,
  useRef,
  useCallback,
} from "react"
import { useDragAndDrop } from "../../hooks/useDragAndDrop"
import { Status, Data, Lightness, IContainerColors } from "./types"
import styles from "./dragAndDrop.module.css"
import { determineBackgroundLightness, sanitize } from "../../utils"
import { useTheme } from "../../hooks/useTheme"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { notify } from "../../reducers/notificationReducer"
import { Select, SelectOption } from "../Select/Select"
import useLocalStorage from "../../hooks/useStorage"
import { useLanguageContext } from "../../contexts/LanguageContext"
import { useConfirm } from "../../contexts/ConfirmContext"
import { useIsClient, useWindow } from "../../hooks/useSSR"
import CardsContainer from "./components/CardsContainer"

const initialStatuses: string[] = ["do", "doing", "done"]

const lightTopDefault = "#bbb"
const lightBodyDefault = "#ddd"
const darkTopDefault = "#111"
const darkBodyDefault = "#333"

export const DragAndDrop = () => {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t, language } = useLanguageContext()
  const confirm = useConfirm()

  const dispatch = useAppDispatch()

  const [data, setData, removeData] = useLocalStorage<Data[]>(
    "DnD-set-data",
    []
  )

  const initialColors = [
    { content: "powderblue", color: "powderblue", lightness: "light" },
    {
      content: "hsl(200,100%,50%)",
      color: "hsl(200,100%,50%)",
      lightness: "light",
    },
    { content: "rgb(0,100,200)", color: "rgb(0,100,200)", lightness: "dark" },
    { content: "#007", color: "#007", lightness: "dark" },
    {
      content: t("LongTextWithoutColorNameAtTheEnd"),
      color: "lightgray",
      lightness: "light",
    },
    {
      content: t("SomeTextNoColorName"),
      color: "lightgray",
      lightness: "light",
    },
    { content: "darkOrange", color: "darkorange", lightness: "light" },
    {
      content: t("WithHSLWrittenLast"),
      color: "hsl(50,50%,50%)",
      lightness: "light",
    },
    {
      content: t("WithKhakiWrittenLast"),
      color: "khaki",
      lightness: "light",
    },
  ]

  const lightTheme = useTheme()

  const defaultTopColor = useMemo<string>(
    () => (lightTheme ? lightTopDefault : darkTopDefault),
    [lightTheme]
  )
  const defaultBodyColor = useMemo<string>(
    () => (lightTheme ? lightBodyDefault : darkBodyDefault),
    [lightTheme]
  )

  const initialBGColors: IContainerColors[] = [
    {
      name: initialStatuses[0],
      top: defaultTopColor,
      body: defaultBodyColor,
      lightness: determineBackgroundLightness(defaultTopColor),
    },
    {
      name: initialStatuses[1],
      top: defaultTopColor,
      body: defaultBodyColor,
      lightness: determineBackgroundLightness(defaultTopColor),
    },
    {
      name: initialStatuses[2],
      top: defaultTopColor,
      body: defaultBodyColor,
      lightness: determineBackgroundLightness(defaultTopColor),
    },
  ]

  const [sending, setSending] = useState<boolean>(false)
  const [statuses, setStatuses, removeStatuses] = useLocalStorage(
    `DnD-stats`,
    initialStatuses
  )
  const [newStatus, setNewStatus] = useState<string>("")
  const [statusesColors, setStatusesColors, deleteStatusesColors] =
    useLocalStorage<IContainerColors[]>("status-background", initialBGColors)
  const [backgroundIsModified, setBackgroundIsModified] =
    useState<boolean>(false)
  const [singleColorTop, setSingleColorTop, deleteSingleColorTop] =
    useLocalStorage<string>("DnD_titleColor", defaultTopColor)
  const [singleColorBody, setSingleColorBody, deleteSingleColorBody] =
    useLocalStorage<string>("DnD_bodyColor", defaultBodyColor)

  const containerRef = useRef<HTMLDivElement>(null)

  const regex = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF- ]*$/

  const storedData = statuses
    .map((status) => {
      if (!isClient || !windowObj) return undefined
      const item = windowObj.localStorage.getItem(`DnD-${status}`)
      return item ? (JSON.parse(item) as unknown[]) : []
    })
    .flat()
    .filter((item): item is Data => item !== undefined)

  useEffect(() => {
    if (lightTheme && !backgroundIsModified) {
      setStatusesColors((prevColors) =>
        prevColors.map((statusColor) => ({
          ...statusColor,
          top: lightTopDefault,
          body: lightBodyDefault,
          lightness: "light",
        }))
      )
    } else if (!lightTheme && !backgroundIsModified) {
      setStatusesColors((prevColors) =>
        prevColors.map((statusColor) => ({
          ...statusColor,
          top: darkTopDefault,
          body: darkBodyDefault,
          lightness: "dark",
        }))
      )
    } else return
  }, [lightTheme, backgroundIsModified])

  // Generate and inject CSS styles whenever statuses change
  useEffect(() => {
    const styleElement = document?.createElement("style")
    styleElement.id = "dnd-styles"
    document?.head.appendChild(styleElement)

    // Disable the link for the current status:
    const generateStyles = (statuses: Status[]) => {
      return statuses
        .map((status) => {
          const safeStatus = sanitize(status)
          return `
          ul.${safeStatus} li.${safeStatus} a.${safeStatus}, 
          ul.${safeStatus} li.${safeStatus} a.${safeStatus} i, 
          ul.${safeStatus} li.${safeStatus} a.${safeStatus} svg {
            cursor: auto;
            pointer-events: none;
            color: var(--color-primary-20);
          } 
          ul.${safeStatus} li a {
            padding: 0.4em 0;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            flex: 0 1 auto;
          }
          ul.${safeStatus} li a > i {
            line-height: 1;
          }
          ul.${safeStatus} li a svg {
            font-size: 0.7rem;
            min-width: 1rem;
            max-width: 1rem;
          }
        `
        })
        .join("\n")
    }
    const styles = generateStyles(statuses)
    styleElement.innerHTML = styles

    return () => {
      document?.head.removeChild(styleElement)
    }
  }, [statuses])

  const addStatus = (newStatus: string) => {
    setSending(true)
    if (regex.test(newStatus)) {
      const newStatusTrim = newStatus.trim().replace(/ /g, "_")
      if (newStatusTrim.length > 20) {
        void dispatch(
          notify(
            `${t("NameTooLong")}: ${t("AMaxOf20CharactersPlease")}`,
            true,
            9
          )
        )
        setSending(false)
        return
      }
      if (newStatus.trim() === "") {
        void dispatch(notify(t("PleaseFillInTheFields"), true, 6))
        setSending(false)
        return
      }
      //if new status is already in the list, notify:
      if (statuses.includes(newStatusTrim)) {
        void dispatch(notify(t("TheCategoryAlreadyExists"), true, 6))
        setSending(false)
        return
      }
      // if already length 8, don't allow more statuses
      if (statuses.length === 8) {
        void dispatch(notify(t("CannotAddMoreCategories"), true, 8))
        setSending(false)
        return
      }
      setStatuses((prevStatuses) => [...prevStatuses, newStatusTrim])
      setStatusesColors((prevColors) => [
        ...prevColors,
        {
          name: newStatusTrim,
          top: defaultTopColor,
          body: defaultBodyColor,
          lightness: determineBackgroundLightness(defaultTopColor),
        },
      ])
      setSending(false)
    } else {
      void dispatch(notify(t("SpecialCharactersNotAllowed"), true, 6))
      setSending(false)
    }
  }

  const reorderStatuses = (oldIndex: number, newIndex: number) => {
    setStatuses((prevStatuses) => {
      const updatedStatuses = [...prevStatuses]
      const [removed] = updatedStatuses.splice(oldIndex, 1)
      updatedStatuses.splice(newIndex, 0, removed)
      return updatedStatuses
    })
  }

  const updateStatus = (index: number, newStatus: string) => {
    if (!regex.test(newStatus)) {
      void dispatch(notify(t("SpecialCharactersNotAllowed"), true, 6))
      return
    }
    setStatuses((prevStatuses) => {
      const newStatusTrim = newStatus.trim().replace(/ /g, "_")
      if (newStatusTrim.length > 20) {
        void dispatch(
          notify(
            `${t("NameTooLong")}: ${t("AMaxOf20CharactersPlease")}`,
            true,
            9
          )
        )
        return prevStatuses
      }
      if (newStatusTrim === "") {
        void dispatch(notify(t("PleaseFillInTheFields"), true, 6))
        return prevStatuses
      }
      if (prevStatuses.includes(newStatusTrim)) {
        void dispatch(notify(t("TheCategoryAlreadyExists"), true, 6))
        return prevStatuses
      }

      const updatedStatuses = [...prevStatuses]
      const oldStatus = updatedStatuses[index]
      updatedStatuses[index] = newStatusTrim

      // Keep background color configs in sync with renamed status
      setStatusesColors((prevColors) =>
        prevColors.map((colorConfig) =>
          colorConfig.name === oldStatus
            ? { ...colorConfig, name: newStatusTrim }
            : colorConfig
        )
      )

      // Update the data array to reflect the new status name
      setData((prevData) =>
        prevData.map((item) =>
          item.status === oldStatus ? { ...item, status: newStatusTrim } : item
        )
      )

      // Call handleRenameStatus after updating statuses
      handleRenameStatus(oldStatus, newStatusTrim)

      return updatedStatuses
    })
  }

  const deleteStatus = async (status: string) => {
    //if only one status left, don't allow removal
    if (statuses.length === 1) {
      void dispatch(notify(t("CannotRemoveLastCategory"), true, 8))
      return
    } // check if there are items with this status
    else if (
      data.some((d) => d.status === status) &&
      (await confirm({
        message: `${t("AreYouSureYouWantToRemoveThis")} (${status}) ${t("ItIsNotEmpty")}`,
      }))
    ) {
      setStatuses((prevStatuses) => prevStatuses.filter((s) => s !== status))
      setData((prevData) => prevData.filter((d) => d.status !== status))
      setStatusesColors((prevColors) =>
        prevColors.filter((c) => c.name !== status)
      )
    } else if (data.every((d) => d.status !== status)) {
      if (await confirm({ message: t("AreYouSureYouWantToRemoveThis") })) {
        setStatuses((prevStatuses) => prevStatuses.filter((s) => s !== status))
        setStatusesColors((prevColors) =>
          prevColors.filter((c) => c.name !== status)
        )
      } else return
    } else return
  }

  const handleChangeBackgroundColors = (
    mode: "reset" | "custom",
    customBodyColor: string | null,
    customTopColor: string | null
  ) => {
    if (mode === "reset") {
      const titleLightness = determineBackgroundLightness(defaultTopColor)
      // Reset all to default colors
      setStatusesColors((prevColors) =>
        prevColors.map((statusColor) => ({
          ...statusColor,
          top: defaultTopColor,
          body: defaultBodyColor,
          lightness: titleLightness,
        }))
      )
      setBackgroundIsModified(false)
    } else if (mode === "custom" && customTopColor) {
      // Set all to custom colors
      const titleLightness = determineBackgroundLightness(customTopColor)
      setStatusesColors((prevColors) =>
        prevColors.map((statusColor) => ({
          ...statusColor,
          top: customTopColor,
          lightness: titleLightness,
        }))
      )
      setBackgroundIsModified(true)
    } else if (mode === "custom" && customBodyColor) {
      setStatusesColors((prevColors) =>
        prevColors.map((statusColor) => ({
          ...statusColor,
          body: customBodyColor,
        }))
      )
      setBackgroundIsModified(true)
    }
  }

  const generateInitialBGColors = useCallback(() => {
    return [
      {
        name: initialStatuses[0],
        top: lightTheme ? lightTopDefault : darkTopDefault,
        body: lightTheme ? lightBodyDefault : darkBodyDefault,
        lightness: lightTheme ? "light" : "dark",
      },
      {
        name: initialStatuses[1],
        top: lightTheme ? lightTopDefault : darkTopDefault,
        body: lightTheme ? lightBodyDefault : darkBodyDefault,
        lightness: lightTheme ? "light" : "dark",
      },
      {
        name: initialStatuses[2],
        top: lightTheme ? lightTopDefault : darkTopDefault,
        body: lightTheme ? lightBodyDefault : darkBodyDefault,
        lightness: lightTheme ? "light" : "dark",
      },
    ] as IContainerColors[]
  }, [lightTheme])

  const generateInitialData = useCallback(
    async (userAddedItems: Data[]) => {
      const array: Data[] = []
      // let state: Status = initialStatuses[1]

      if (
        userAddedItems &&
        userAddedItems.length > 0 &&
        (await confirm({ message: t("DoYouWantToDeleteYourColorsText") }))
      ) {
        removeStatuses()
        setStatuses(initialStatuses)
        setStatusesColors(generateInitialBGColors())
        removeData()
        setData([])
        for (let i = 0; i < initialColors.length; i++) {
          const color = initialColors[i].color ?? "lightgray"
          const content = initialColors[i].content ?? "lightgray"
          const lightness =
            (initialColors[i].lightness as Lightness) ??
            determineBackgroundLightness(color)

          // // Randomize the item status
          // const randomIndex = Math.floor(Math.random() * statuses.length)
          // state = statuses[randomIndex]

          const item: Data = {
            id: i,
            content: content,
            color: color,
            status:
              i < 4
                ? initialStatuses[0]
                : i < 6
                  ? initialStatuses[1]
                  : initialStatuses[2],
            lightness: lightness,
            isUser: false,
          }
          array.push(item)
        }
        return array
      }
      if (userAddedItems.length > 0) {
        for (let i = 0; i < userAddedItems.length; i++) {
          const color = userAddedItems[i].color ?? "lightgray"
          const content = userAddedItems[i].content ?? "lightgray"
          const lightness = determineBackgroundLightness(color)

          // // Randomize the item status
          // const randomIndex = Math.floor(Math.random() * statuses.length)
          // state = statuses[randomIndex]

          const item: Data = {
            id: i,
            content: content,
            color: color,
            status: userAddedItems[i].status,
            lightness: lightness,
            isUser: true,
          }
          array.push(item)
        }
        for (
          let i: number = userAddedItems.length;
          i < initialColors.length + userAddedItems.length;
          i++
        ) {
          const color =
            initialColors[i - userAddedItems.length].color ?? "lightgray"
          const content =
            initialColors[i - userAddedItems.length].content ?? "lightgray"
          const lightness =
            (initialColors[i - userAddedItems.length].lightness as Lightness) ??
            determineBackgroundLightness(color)

          // // Randomize the item status
          // const randomIndex = Math.floor(Math.random() * statuses.length)
          // state = statuses[randomIndex]

          const item: Data = {
            id: i,
            content: content,
            color: color,
            status:
              i < 4
                ? initialStatuses[0]
                : i < 6
                  ? initialStatuses[1]
                  : initialStatuses[2],
            lightness: lightness,
            isUser: false,
          }
          array.push(item)
        }
        return array
      } else {
        removeStatuses()
        setStatuses(initialStatuses)

        setStatusesColors(generateInitialBGColors())
        removeData()
        setData([])
        for (let i = 0; i < initialColors.length; i++) {
          const color = initialColors[i].color ?? "lightgray"
          const content = initialColors[i].content ?? "lightgray"
          const lightness =
            (initialColors[i].lightness as Lightness) ??
            determineBackgroundLightness(color)

          // // Randomize the item status
          // const randomIndex = Math.floor(Math.random() * statuses.length)
          // state = statuses[randomIndex]

          const item: Data = {
            id: i,
            content: content,
            color: color,
            status:
              i < 4
                ? initialStatuses[0]
                : i < 6
                  ? initialStatuses[1]
                  : initialStatuses[2],
            lightness: lightness,
            isUser: false,
          }
          array.push(item)
        }
        return array
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const startAgain = async () => {
    if (await confirm({ message: t("AreYouSureYouWantToDeleteThisVersion") })) {
      const userAddedItems = data.filter((d) => d.isUser)
      setData(await generateInitialData(userAddedItems))
      setStatusesColors(generateInitialBGColors())
    } else return
  }

  const startAgainEmpty = async () => {
    const userAddedItems = data.filter((d) => d.isUser)
    if (
      await confirm({
        message: `${t("AreYouSureYouWantToDeleteThisVersion")} (${t("Clear")})`,
      })
    ) {
      if (!userAddedItems || userAddedItems.length === 0) {
        removeData()
        setData([])
      } else if (
        userAddedItems &&
        userAddedItems.length > 0 &&
        (await confirm({ message: t("DoYouWantToDeleteYourColorsText") }))
      ) {
        statuses.forEach((status) => {
          listItemsByStatus[status].removeItems()
        })
        removeData()
        setData([])
      } else {
        removeData()
        setData(
          userAddedItems.map((item, index) => {
            const color = item.color ?? "lightgray"
            const content = item.content ?? "lightgray"
            const lightness =
              item.lightness ?? determineBackgroundLightness(color)
            return {
              id: index,
              content: content,
              color: color,
              status: item.status ?? initialStatuses[1],
              lightness: lightness,
              isUser: true,
            }
          })
        )
      }
    }
  }

  const setTheData = useMemo(() => {
    // If data is already in localStorage, use that
    if (storedData.length > 0) {
      return storedData
    }
    return null
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setTheBGColors = useMemo(() => {
    // If background colors are already in localStorage, use that
    if (statusesColors.length > 0) {
      return statusesColors
    }
    return null
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (setTheBGColors && Array.isArray(setTheBGColors)) {
      setStatusesColors(setTheBGColors)
    }
  }, [setTheBGColors, setStatusesColors])

  useEffect(() => {
    if (setTheData && Array.isArray(setTheData)) {
      setData(setTheData)
    } else {
      void (async () => {
        const initialData = await generateInitialData([])
        setData(initialData)
      })()
    }
  }, [setTheData, generateInitialData, setData])

  const [newColor, setNewColor] = useState<string>("")
  const [newStatusForItem, setNewStatusForItem] = useState<SelectOption>({
    label: statuses[0],
    value: statuses[0],
  })

  const handleAddColor = async (
    e: FormEvent,
    newColor: string,
    statusForItem: Data["status"]
  ) => {
    e.preventDefault()
    setSending(true)
    if (newColor.trim() === "") {
      void dispatch(notify(t("PleaseFillInTheFields"), true, 6))
      setSending(false)
      return
    }
    // Check if there are more than one word. If the last word is a color, separate it and handle it as the color of the item:
    const words = newColor.trim().split(" ")
    const allButLastWord =
      words.length === 1 ? newColor : words.slice(0, -1).join(" ")
    const lastWord = words.length === 1 ? newColor : words[words.length - 1]
    const isWholeWordValidColor = isValidColor(newColor) // for when there are spaces in the color name
    const isLastWordValidColor = isValidColor(lastWord)

    if (isWholeWordValidColor) {
      const highestIdInData = data.reduce(
        (acc, item) => (item.id > acc ? item.id : acc),
        0
      )
      const newItem: Data = {
        id: highestIdInData + 1,
        content: newColor,
        color: newColor,
        status: statusForItem,
        lightness: determineBackgroundLightness(newColor),
        isUser: true,
      }
      setData((prevData) => [...prevData, newItem])

      containerRef.current?.scrollIntoView({ behavior: "smooth" })
      setSending(false)
    } else if (isLastWordValidColor) {
      const highestIdInData = data.reduce(
        (acc, item) => (item.id > acc ? item.id : acc),
        0
      )
      const newItem: Data = {
        id: highestIdInData + 1,
        content: allButLastWord,
        color: lastWord,
        status: statusForItem,
        lightness: determineBackgroundLightness(lastWord),
        isUser: true,
      }
      setData((prevData) => [...prevData, newItem])

      containerRef.current?.scrollIntoView({ behavior: "smooth" })
      setSending(false)
    } else {
      // Add the color anyway with the color lightgray and lightness light. This is to enable users to add sortable items for general use
      const highestIdInData = data.reduce(
        (acc, item) => (item.id > acc ? item.id : acc),
        0
      )
      const newItem: Data = {
        id: highestIdInData + 1,
        content: newColor,
        color: "lightgray",
        status: statusForItem,
        lightness: "light",
        isUser: true,
      }
      setData((prevData) => [...prevData, newItem])
      containerRef.current?.scrollIntoView({ behavior: "smooth" })
      setSending(false)
    }
  }

  const handleRemoveColor = async (data: Data) => {
    if (
      await confirm({
        message: `${t("AreYouSureYouWantToRemoveThis")} (${data.content})`,
      })
    ) {
      setData((prevData) => prevData.filter((d) => d.id !== data.id))
    } else return
  }

  const isValidColor = (color: string) => {
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      return CSS.supports("color", color)
    }
    return false
  }

  const {
    isDragging,
    listItemsByStatus,
    handleDragging,
    handleRenameStatus,
    handleUpdate,
  } = useDragAndDrop(data, statuses)

  const handleUpdateHandler = useCallback(
    (id: number, status: Status, target?: number) => {
      handleUpdate(id, status, target)

      if (data && data.length > 0)
        setData((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.id === id) {
              return { ...item, status: status }
            }
            return item
          })
          return updatedData
        })
    },
    [handleUpdate, data, setData]
  )

  return (
    <>
      <section className="card">
        <div>
          <div
            className={`${lightTheme ? styles.light : ""} ${styles.grid} ${
              statuses.length < 2
                ? styles.one
                : statuses.length < 3
                  ? styles.two
                  : statuses?.length < 4 ||
                      statuses?.length === 5 ||
                      statuses?.length === 6
                    ? styles.three
                    : styles.four
            }`}
            ref={containerRef}
          >
            {statuses.map((container) => (
              <CardsContainer
                itemsByStatus={listItemsByStatus[container]?.items}
                setData={setData}
                statusesColors={statusesColors}
                setStatusesColors={setStatusesColors}
                defaultTopColor={defaultTopColor}
                defaultBodyColor={defaultBodyColor}
                status={container}
                statuses={statuses}
                key={container}
                isDragging={isDragging}
                handleDragging={handleDragging}
                handleUpdate={handleUpdateHandler}
                handleRemoveColor={handleRemoveColor}
                lightTheme={lightTheme}
                updateStatus={updateStatus}
                reorderStatuses={reorderStatuses}
                deleteStatus={deleteStatus}
                regex={regex}
              />
            ))}
          </div>
          <div className="flex center gap max-content margin0auto">
            <button onClick={() => void startAgain()}>{t("Reset")}</button>
            <button onClick={() => void startAgainEmpty()}>{t("Clear")}</button>
            <button
              onClick={() =>
                void handleChangeBackgroundColors("reset", null, null)
              }
            >
              {t("ResetBackgroundColors")}
            </button>
          </div>
        </div>
      </section>
      <section className="card">
        <div>
          <div
            className={`${lightTheme ? styles.light : ""} ${styles.wrapper} ${styles["color-picker-wrap"]}`}
          >
            <h3> {t("SetCustomBackgroundColors")}</h3>
            <p>
              {t("Tip")}: {t("YouMayEditTheBackgroundColorBy")}
            </p>
            <div>
              <label htmlFor="top-color-picker">
                {t("Name")}:
                <input
                  type="color"
                  id="top-color-picker"
                  name="top-color-picker"
                  className={styles["color-picker-input"]}
                  value={singleColorTop}
                  onChange={(e) => setSingleColorTop(e.target.value)}
                />
              </label>

              <button
                className="small"
                onClick={() =>
                  void handleChangeBackgroundColors(
                    "custom",
                    null,
                    singleColorTop
                  )
                }
              >
                {t("Set")}
              </button>
            </div>
            <div>
              <label htmlFor="body-color-picker">
                {t("Content")}:
                <input
                  type="color"
                  id="body-color-picker"
                  name="body-color-picker"
                  className={styles["color-picker-input"]}
                  value={singleColorBody}
                  onChange={(e) => setSingleColorBody(e.target.value)}
                />
              </label>
              <button
                className="small"
                onClick={() =>
                  void handleChangeBackgroundColors(
                    "custom",
                    singleColorBody,
                    null
                  )
                }
              >
                {t("Set")}
              </button>
            </div>
            <div className={styles["reset-both-wrap"]}>
              <button //reset both
                className="small"
                onClick={() => {
                  setSingleColorTop(defaultTopColor)
                  setSingleColorBody(defaultBodyColor)
                }}
              >
                {t("Reset")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <div>
          <div className={`${styles["add-color"]} ${styles.wrapper}`}>
            <h3>{t("AddTextOrColor")}</h3>
            <p>
              {t("ForExample")} &quot;darkblue&quot; {t("Or")}{" "}
              &quot;slategray&quot;. {t("YouMayAlsoAddOtherWordsForGenericUse")}
              . {t("TipIfYouAddAGenericWordYouCanColorTheCard")}
            </p>
            <form
              onSubmit={(e) =>
                void handleAddColor(e, newColor, newStatusForItem.label)
              }
            >
              <div className={`input-wrap ${styles["input-wrap"]}`}>
                <label htmlFor="dnd-color-add">
                  <input
                    required
                    type="text"
                    id="dnd-color-add"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                  />
                  <span>{t("AddTextOrColor")}</span>
                </label>
              </div>
              <Select
                language={language}
                id="dnd-color-status"
                className={`${styles["color-select"]} color`}
                instructions={t("SelectCategory")}
                hide
                options={statuses.map((status) => ({
                  label: status,
                  value: status,
                }))}
                value={newStatusForItem}
                onChange={(o) =>
                  setNewStatusForItem(
                    o ?? {
                      label: statuses[0],
                      value: statuses[0],
                    }
                  )
                }
              />
              <button type="submit" disabled={sending}>
                {t("AddTextOrColor")}
              </button>
            </form>
            <p className="textcenter">
              <span>{t("NeedHelp")} </span>{" "}
              <a
                href="https://htmlcolorcodes.com/color-names/"
                target="_blank"
                rel="noreferrer"
              >
                {t("ColorNames")}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="card">
        <div>
          <div className={`${styles["add-status"]} ${styles.wrapper}`}>
            <h3>{t("AddANewCategory")}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                addStatus(newStatus)
                const scrollTarget = containerRef.current
                scrollTarget?.scrollIntoView({ behavior: "smooth" })
                setNewStatus("")
              }}
            >
              <div className="input-wrap">
                <label htmlFor="dnd-status-add">
                  <input
                    required
                    type="text"
                    id="dnd-status-add"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  />
                  <span>{t("AddANewCategory")}</span>
                </label>
              </div>
              <button type="submit" disabled={sending}>
                {t("Submit")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
