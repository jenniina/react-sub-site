import React, { useContext, useEffect, useState } from "react";
import { ELanguages } from "../../../types";
import styles from "../css/todo.module.css";
import { ITaskDraggable } from "./TodoList";
import { TCategory, TPriority } from "../types";
import { MdDragIndicator, MdWork } from "react-icons/md";
import { sanitize } from "../../../utils";
import { FaTriangleExclamation } from "react-icons/fa6";
import { SelectOption } from "../../Select/Select";
import TodoItemModal from "./TodoItemModal";
import { IoPersonCircleSharp } from "react-icons/io5";
import { HiDotsCircleHorizontal, HiDotsHorizontal } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineEdit } from "react-icons/ai";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { notify } from "../../../reducers/notificationReducer";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useConfirm } from "../../../contexts/ConfirmContext";
import { useIsClient, useWindow } from "../../../hooks/useSSR";

export default function Todo({
  todo,
  toggleTodo,
  deleteTodo,
  language,
  modifyTodo,
  isDragging,
  handleUpdate,
  handleDragging,
  sending,
  priorityOptions,
  categoryOptions,
  zin,
  maxCharacters,
}: {
  todo: ITaskDraggable | undefined;
  toggleTodo: (key: string | undefined) => void;
  deleteTodo: (key: string | undefined) => void;
  language: ELanguages;
  modifyTodo: (
    key: string | undefined,
    name: string | undefined,
    priority: TPriority,
    deadline: string,
    category: string
  ) => void;
  isDragging: boolean;
  handleUpdate: (id: number, status: string, target?: number) => void;
  handleDragging: (dragging: boolean) => void;
  sending: boolean;
  priorityOptions: SelectOption[];
  categoryOptions: SelectOption[];
  zin: number;
  maxCharacters: number;
}) {
  const isClient = useIsClient();
  const windowObj = useWindow();

  const { t } = useContext(LanguageContext)!;
  const confirm = useConfirm();

  const dispatch = useAppDispatch();
  const [newName, setNewName] = useState(todo?.name ?? "");
  const [showDeadline, setShowDeadline] = useState(false);
  const [newPriority, setNewPriority] = useState<TPriority>(
    todo?.priority || "low"
  );
  const [newDay, setNewDay] = useState<string>(
    todo?.deadline
      ? new Date(todo.deadline).getDate().toString().padStart(2, "0")
      : ""
  );
  const [newMonth, setNewMonth] = useState<string>(
    todo?.deadline
      ? (new Date(todo.deadline).getMonth() + 1).toString().padStart(2, "0")
      : ""
  );
  const [newYear, setNewYear] = useState<string>(
    todo?.deadline ? new Date(todo.deadline).getFullYear().toString() : ""
  );
  const combinedDeadline =
    newDay && newMonth && newYear ? `${newYear}-${newMonth}-${newDay}` : "";

  const [newCategory, setNewCategory] = useState<TCategory>(
    todo?.category || "other"
  );
  const [isOpen, setIsOpen] = useState(false);

  function handleTodoClick() {
    toggleTodo(todo?.key);
  }
  async function handleDelete() {
    if (
      await confirm({
        message: t("AreYouSureYouWantToDelete") + ' "' + todo?.name + '"?',
      })
    ) {
      setNewName("");
      deleteTodo(todo?.key);
      setIsOpen(false);
    }
  }
  const handleModify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newName === "") {
      dispatch(notify(t("AddTask"), true, 5));
      return;
    }
    if (newName.length > maxCharacters) {
      dispatch(notify(t("NameTooLong"), true, 5));
      return;
    }
    modifyTodo(todo?.key, newName, newPriority, combinedDeadline, newCategory);
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewName(e.target.value);
  };

  useEffect(() => {
    if (todo?.deadline) {
      setShowDeadline(true);
    }
  }, [todo]);

  useEffect(() => {
    // Ensure input values are always synchronized with todo props
    if (todo?.name !== newName) {
      setNewName(todo?.name || "");
    }
    if (todo?.deadline) {
      const deadlineDate = new Date(todo.deadline);
      setNewDay(deadlineDate.getDate().toString().padStart(2, "0"));
      setNewMonth((deadlineDate.getMonth() + 1).toString().padStart(2, "0"));
      setNewYear(deadlineDate.getFullYear().toString());
    }
  }, [todo]);

  const [allowDrag, setAllowDrag] = useState(true);
  const [isSelectingText, setIsSelectingText] = useState(false);

  const handleMouseDown = () => {
    setAllowDrag(true);
    setIsSelectingText(false);
  };
  const handleMouseOverHandle = () => {
    setAllowDrag(true);
  };
  const handleMouseOverSpan = () => {
    setAllowDrag(false);
  };
  const handleMouseDownSpan = () => {
    setAllowDrag(false);
    setIsSelectingText(true);
  };
  const handleMouseUpSpan = () => {
    if (!isClient || !windowObj) return;
    if (windowObj.getSelection()?.toString()) {
      setAllowDrag(false);
      setIsSelectingText(true);
    } else {
      setAllowDrag(true);
      setIsSelectingText(false);
    }
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (isSelectingText) {
      e.preventDefault();
    }
  };

  return (
    <>
      <li
        style={{ zIndex: `calc(${zin} - ${todo?.order})` }}
        className={`${isDragging ? "dragging" : ""} ${
          isOpen ? styles.open : styles.closed
        }`}
        draggable={allowDrag}
        onDragStart={(e) => {
          if (allowDrag) {
            e.dataTransfer.setData(
              "application/my-app",
              todo?.order?.toString() as string
            );
            handleDragging(true);
          } else {
            e.preventDefault();
          }
        }}
        onDragEnd={() => handleDragging(false)}
      >
        <span
          onMouseOver={handleMouseOverHandle}
          onMouseDown={handleMouseDown}
          className={`${styles["drag-handle"]} tooltip-wrap`}
        >
          <MdDragIndicator />
          <span className="tooltip narrow2 below right">{t("Draggable")}</span>
        </span>
        <label onClick={handleLabelClick}>
          <input
            type="checkbox"
            id={`check_${sanitize(todo?.name)}`}
            checked={todo?.complete ?? false}
            onChange={handleTodoClick}
          />
          <span
            onMouseOver={handleMouseOverSpan}
            onMouseDown={handleMouseDownSpan}
            onMouseUp={handleMouseUpSpan}
          >
            {todo?.name}
          </span>
          <div className={`${styles["more-info-wrap"]}`}>
            {todo?.deadline &&
              todo?.deadline !== "" &&
              (() => {
                const deadlineDate = new Date(todo.deadline);
                const today = new Date();

                deadlineDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                const isOverdue = deadlineDate < today;
                const isToday = deadlineDate.getTime() === today.getTime();

                return (
                  <span
                    className={`${styles["deadline"]} ${
                      isOverdue ? styles["overdue"] : ""
                    } ${isToday ? styles["today"] : ""}`}
                  >
                    {t("Deadline")}:{" "}
                    {isToday
                      ? t("Today")
                      : new Date(todo.deadline).toLocaleDateString(language, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                  </span>
                );
              })()}
          </div>
          {/* <div className={`${styles['more-info-wrap']}`}>
            {todo?.category && (
              <span>
                {t('Category')}:{' '}
                {translate(translationMap, todo?.category, language)}
              </span>
            )}

            {todo?.priority && todo?.category && <span aria-hidden='true'> | </span>}

            {todo?.priority && (
              <span>
                {t('Priority')}:{' '}
                {translate(translationMap, todo?.priority, language)}
              </span>
            )}

            {todo?.deadline && todo?.deadline !== '' && todo?.priority && (
              <span aria-hidden='true'> | </span>
            )}

            {todo?.deadline &&
              todo?.deadline !== '' &&
              (() => {
                const deadlineDate = new Date(todo.deadline)
                const today = new Date()

                deadlineDate.setHours(0, 0, 0, 0)
                today.setHours(0, 0, 0, 0)

                const isOverdue = deadlineDate < today
                const isToday = deadlineDate.getTime() === today.getTime()

                return (
                  <span
                    className={`${styles['deadline']} ${
                      isOverdue ? styles['overdue'] : ''
                    } ${isToday ? styles['today'] : ''}`}
                  >
                    {t('Deadline')}:{' '}
                    {isToday
                      ? t('Today')
                      : new Date(todo.deadline).toLocaleDateString(language, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                  </span>
                )
              })()}
          </div> */}
        </label>

        <div className={`${styles["btn-wrap"]}`}>
          {todo?.priority === "high" ? (
            <b className={`tooltip-wrap ${styles.high}`}>
              <FaTriangleExclamation />
              <span className="scr">
                {t("Priority")}: {t("High")}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t("Priority")}: {t("High")}
              </span>
            </b>
          ) : todo?.priority === "medium" ? (
            <b className={`tooltip-wrap ${styles.medium}`}>
              <HiDotsHorizontal />
              <span className="scr">
                {t("Priority")}: {t("Medium")}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t("Priority")}: {t("Medium")}
              </span>
            </b>
          ) : todo?.priority === "low" ? (
            <b className={`tooltip-wrap ${styles.low}`}>
              <BsArrowDownCircleFill viewBox="0 0 17 17" />
              <span className="scr">
                {t("Priority")}: {t("Low")}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t("Priority")}: {t("Low")}
              </span>
            </b>
          ) : (
            <>&nbsp;</>
          )}

          {todo?.category === "personal" ? (
            <b className={`tooltip-wrap ${styles.cat}`}>
              <IoPersonCircleSharp />
              <span className="scr">
                {t("CategoryTitle")}: {t("Personal")}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t("CategoryTitle")}: {t("Personal")}
              </span>
            </b>
          ) : todo?.category === "work" ? (
            <b className={`tooltip-wrap ${styles.cat} ${styles.bg}`}>
              <MdWork />
              <span className="scr">
                {t("CategoryTitle")}: {t("Work")}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t("CategoryTitle")}: {t("Work")}
              </span>
            </b>
          ) : todo?.category === "shopping" ? (
            <b className={`tooltip-wrap ${styles.cat} ${styles.bg}`}>
              <TiShoppingCart />
              <span className="scr">
                {t("CategoryTitle")}: {t("Shopping")}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t("CategoryTitle")}: {t("Shopping")}
              </span>
            </b>
          ) : (
            <b className={`tooltip-wrap ${styles.cat}`}>
              <HiDotsCircleHorizontal />
              <span className="scr">
                {t("CategoryTitle")}: {t("Other")}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t("CategoryTitle")}: {t("Other")}
              </span>
            </b>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className={`${styles["edit"]} tooltip-wrap`}
            disabled={todo?.complete ?? false}
          >
            <AiOutlineEdit />
            <span className="scr">{t("Edit")}</span>
            <span className="tooltip narrow2 below left" aria-hidden="true">
              {t("Edit")}
            </span>
          </button>
          <button
            className={`${styles["delete"]} tooltip-wrap`}
            onClick={isOpen ? () => setIsOpen(false) : handleDelete}
          >
            <span className={styles["delete-inner"]} aria-hidden="true">
              &times;
            </span>
            <span className="scr">{t("DeleteTask")}</span>
            <span className="tooltip below left narrow2" aria-hidden="true">
              {t("DeleteTask")}
            </span>
          </button>
        </div>

        {isOpen && (
          <TodoItemModal
            title={todo?.name}
            language={language}
            handleModify={handleModify}
            newName={newName}
            setNewName={setNewName}
            newPriority={newPriority}
            setNewPriority={setNewPriority}
            newDay={newDay}
            setNewDay={setNewDay}
            newMonth={newMonth}
            setNewMonth={setNewMonth}
            newYear={newYear}
            setNewYear={setNewYear}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            priorityOptions={priorityOptions}
            categoryOptions={categoryOptions}
            showDeadline={showDeadline}
            setShowDeadline={setShowDeadline}
            sending={sending}
            todo={todo}
            setIsOpen={setIsOpen}
            maxCharacters={maxCharacters}
          />
        )}
      </li>
    </>
  );
}
