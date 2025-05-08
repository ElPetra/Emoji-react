import React, { useState, useEffect } from "react";
import { Article } from "../Article/Article";
import { data } from "../../data/emoji";
import { Pagination } from "../Pagination/Pagination";

import "./Main.css";
// import { Input } from "../Input/Input";

export function Main() {
  const [searchItem, setSearchItem] = useState(""); // Состояние инпута (что написано в инпуте при загрузке стр.)
  const [currentPage, setCurrentPage] = useState(""); // Стартовая страница
  const [emojiPerPage, setEmojiPerPage] = useState(12); // Количество эмодзи на странице
  const [filteredData, setFilteredData] = useState([]); // Отфильтрованные данные

  // Фильтрация данных при изменении строки поиска
  useEffect(() => {
    const filteredData = data.filter(
      (value) =>
        value.title.toLowerCase().includes(searchItem.toLowerCase().trim()) ||
        value.keywords.toLowerCase().includes(searchItem.toLowerCase().trim())
    );
    setFilteredData(filteredData);
    setCurrentPage(1); // При изменении фильтрованных данных сбрасываем текущую страницу на первую
  }, [searchItem, emojiPerPage]);

  // Определение индексов первого и последнего эмодзи на странице
  const lastEmojiIndex = currentPage * emojiPerPage; //последний эмодзи на странице
  const firstEmojiIndex = lastEmojiIndex - emojiPerPage; //первый эмодзи на странице

  // Получение текущей страницы эмодзи
  const currentEmoji = filteredData.slice(firstEmojiIndex, lastEmojiIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePerPageChange = (perPage) => {
    setEmojiPerPage(perPage);
  };

  return (
    <section className="main">
      <input
        className="input"
        type="text"
        placeholder="Enter keywords..."
        onChange={(event) => setSearchItem(event.target.value.toLowerCase())}
      />
      {/* <Input
        value={inputBefore}
        onchange={(event) => inputAfter(event.target.value)}
      /> */}
      <div className="container">
        {/* {data
          .filter(
            (el) =>
              el.title.toLowerCase().includes(inputClear) ||
              el.keywords.toLowerCase().includes(inputClear)
          ) */}
        {currentEmoji.map((el, index) => (
          <Article
            id={index}
            symbol={el.symbol}
            title={el.title}
            text={
              (el.keywords = [...new Set(el.keywords.split(" "))].join(" "))
            }
          />
        ))}
      </div>
      <Pagination
        emojiPerPage={emojiPerPage}
        totalEmoji={filteredData.length}
        paginate={paginate}
        currentPage={currentPage}
        handlePerPageChange={handlePerPageChange}
      />
    </section>
  );
}
