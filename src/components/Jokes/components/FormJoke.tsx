import React, { lazy, Suspense, useContext } from "react";
//import Joke from './Joke'
import { Select } from "../../Select/Select";
import { SelectOption } from "../../Select/Select";
import { useEffect } from "react";
import ButtonToggle from "../../ButtonToggle/ButtonToggle";
import {
  EJokeType,
  ESafemode,
  ECategories,
  TCategoryByLanguages,
  IJoke,
} from "../types";
import { ELanguages, ELanguagesLong } from "../../../types";
import { FaAnglesDown } from "react-icons/fa6";
import { LanguageContext } from "../../../contexts/LanguageContext";

const Joke = lazy(() => import("./Joke"));

interface Props {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  jokeCategory: ECategories | null;
  setJokeCategory: (jokeCategory: ECategories) => void;
  setQueryValue: (queryValue: string) => void;
  setLanguage: (language: ELanguages) => void;
  optionsCategory: (enumObj: TCategoryByLanguages) => SelectOption[];
  setQuery: (query: string) => void;
  categoryByLanguages: TCategoryByLanguages;
  categoryValues: SelectOption[];
  setCategoryValues: (categoryValues: SelectOption[]) => void;
  query: string;
  language: ELanguages;
  joke: string;
  delivery?: string;
  jokeId: IJoke["jokeId"];
  author: string;
  submitted: boolean;
  reveal: boolean;
  setReveal: (reveal: boolean) => void;
  isCheckedSafemode: boolean;
  isCheckedJokeType: boolean;
  visibleJoke: boolean;
  setVisibleJoke: (visibleJoke: boolean) => void;
  handleToggleChangeSafemode: () => void;
  handleToggleChangeEJokeType: () => void;
  handleJokeSave: (e: React.FormEvent<HTMLFormElement>) => void;
  options: (enumObj: typeof ELanguagesLong) => SelectOption[];
  getKeyByValue: (
    enumObj:
      | typeof ECategories
      | typeof EJokeType
      | typeof ESafemode
      | typeof ELanguages,
    value: ECategories | EJokeType | ESafemode | ELanguages
  ) => undefined | SelectOption["label"];
  norrisCategories: SelectOption[];
  selectedNorrisCategory: SelectOption | undefined;
  setSelectedNorrisCategory: (
    selectedNorrisCategory: SelectOption | undefined
  ) => void;
  hasNorris: boolean;
  getCategoryInLanguage: (
    category: ECategories | null,
    language: ELanguages
  ) => string | undefined;
  subCategoryResults: string[];
  handleBlacklistUpdate: (
    jokeId: IJoke["jokeId"],
    language: ELanguages,
    value: string | undefined
  ) => void;
  sending: boolean;
}
const Form = ({
  handleFormSubmit,
  jokeCategory,
  categoryValues,
  setCategoryValues,
  setJokeCategory,
  setQueryValue,
  getKeyByValue,
  setLanguage,
  setQuery,
  joke,
  language,
  query,
  delivery,
  jokeId,
  author,
  options,
  submitted,
  isCheckedSafemode,
  isCheckedJokeType,
  handleToggleChangeSafemode,
  handleToggleChangeEJokeType,
  reveal,
  setReveal,
  handleJokeSave,
  optionsCategory,
  categoryByLanguages,
  visibleJoke,
  setVisibleJoke,
  norrisCategories,
  selectedNorrisCategory,
  setSelectedNorrisCategory,
  hasNorris,
  getCategoryInLanguage,
  subCategoryResults,
  handleBlacklistUpdate,
  sending,
}: Props) => {
  const { t } = useContext(LanguageContext)!;

  useEffect(() => {
    setTimeout(() => {
      // Set z-index of select containers so that they do not open behind the next select container
      const selectContainers = document?.querySelectorAll(
        ".select-container"
      ) as NodeListOf<HTMLDivElement>;
      const totalContainers = selectContainers?.length + 2;

      selectContainers?.forEach((container, index) => {
        const zIndex = totalContainers - index;
        container.style.zIndex = `${zIndex}`;
      });
    }, 500);
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setVisibleJoke(false);
          setTimeout(() => {
            handleFormSubmit(e);
          }, 400);
        }}
        className="joke"
      >
        <div className="controls-wrap">
          <Select
            language={language}
            id="language-joke"
            className="language full"
            instructions={`${t("SelectALanguage")}:`}
            options={options(ELanguagesLong)}
            value={
              language
                ? ({
                    value: language,
                    label: ELanguagesLong[language],
                  } as SelectOption)
                : undefined
            }
            onChange={(o) => {
              setLanguage(o?.value as ELanguages);
              setJokeCategory(ECategories.Misc);
            }}
          />

          <div className="toggle-wrap">
            <ButtonToggle
              isChecked={isCheckedSafemode}
              name="safemode"
              id="safemode"
              className={`${language} ${
                !isCheckedSafemode ? "unsafe" : ""
              } safemode`}
              label={`${t("SafemodeTitle")}: `}
              on={t("SafeTitle")}
              off={t("UnsafeTitle")}
              handleToggleChange={handleToggleChangeSafemode}
            />

            <ButtonToggle
              isChecked={isCheckedJokeType}
              name="joketype"
              id="joketype"
              className={`${language} joketype`}
              label={`${t("JokeTypeTitle")}: `}
              on={t("TwoPart")}
              off={t("Single")}
              handleToggleChange={handleToggleChangeEJokeType}
              equal={true}
            />
          </div>
        </div>

        {categoryByLanguages ? (
          <Select
            language={language}
            multiple
            id="jokeCategory"
            className={`category`}
            instructions={`${t("SelectACategory")}:`}
            selectAnOption={t("Any")}
            value={categoryValues}
            options={optionsCategory(categoryByLanguages as any)}
            onChange={(o: SelectOption[]) => {
              setCategoryValues(o);
              setJokeCategory(o?.map((s) => s.value).join(",") as ECategories);
            }}
          />
        ) : (
          ""
        )}

        <Select
          language={language}
          id="jokeCategoryNorrisCategories"
          className={`category extras ${hasNorris ? "" : "hidden"}`}
          instructions={`${t("ChuckNorrisCategory")}:`}
          selectAnOption={t("Any")}
          value={selectedNorrisCategory}
          options={norrisCategories}
          onChange={(o) => {
            setSelectedNorrisCategory(o as SelectOption);
          }}
        />

        <div className="flex column center">
          <div className="input-wrap">
            <label htmlFor="queryValue">
              <input
                type="text"
                id="queryValue"
                name="queryValue"
                value={query}
                onChange={(e) => {
                  setQuery((e.target as HTMLInputElement).value);
                  setQueryValue(
                    encodeURIComponent((e.target as HTMLInputElement).value) +
                      "&"
                  );
                }}
              />
              <span>{t("SearchByKeyword")}</span>
            </label>
          </div>

          <button id="generate-joke" type="submit" disabled={sending}>
            {t("FindAJoke")}
          </button>
        </div>
      </form>

      <div className={`downwards-arrow ${submitted ? "play" : ""}`}>
        <FaAnglesDown />
      </div>
      <Suspense
        fallback={
          <div className="flex center margin0auto textcenter">
            {t("Loading")}...
          </div>
        }
      >
        <Joke
          sending={sending}
          joke={joke}
          delivery={delivery}
          author={author}
          jokeId={jokeId}
          reveal={reveal}
          jokeCategory={jokeCategory}
          setReveal={setReveal}
          handleJokeSave={handleJokeSave}
          language={language}
          visibleJoke={visibleJoke}
          getCategoryInLanguage={getCategoryInLanguage}
          subCategoryResults={subCategoryResults}
          handleBlacklistUpdate={handleBlacklistUpdate}
        />
      </Suspense>
    </>
  );
};

export default Form;
