const axios = require('axios');
const cheerio = require('cheerio');
const Books = require('../models/Book');


/**
 * 获取豆瓣网源代码
 */
async function getBooksHTML() {
  const res = await axios.get('https://book.douban.com/latest');
  return res.data;
}

/**
 * 从网页源码中分析出详情链接
 * @return {Array} links 书籍详情链接数组
 */
async function getBookLinks() {
  const html = await getBooksHTML();
  const $ = cheerio.load(html);
  const achorElements = $('#content .grid-16-8 .media .media__img a');
  const links = achorElements.map((i, ele) => {
    const href = ele.attribs['href'];
    return href;
  }).get();
  return links;
}

/**
 * 传入书籍详情链接，获取对应的书籍信息（name，imgUrl，author，publishDate）
 * @param {*} link 书籍详情链接
 * @returns 
 */
async function getBookDetail(link) {
  const res = await axios.get(link);
  const $ = cheerio.load(res.data);
  // 获取书籍名字
  const name = $('#wrapper > h1 span').text().trim();
  // 获取数据封面
  const imgUrl = $('#content #mainpic img').attr('src');
  // 获取书籍信息标签
  const bookSpans = $('#content #info span.pl');
  // 获取书籍作者
  const author = bookSpans.filter((i, ele) => {
    return $(ele).text().includes('作者')
  }).next('a').text();
  // 获取书籍出版年
  const publishDate = bookSpans.filter((i, ele) => {
    return $(ele).text().includes('出版年')
  })[0].nextSibling.nodeValue.trim();

  return {
    name,
    imgUrl,
    author,
    publishDate
  }
}

async function fetchAll() {
  const links = await getBookLinks();
  const proms = links.map(link => {
    return getBookDetail(link);
  })
  return Promise.all(proms);
}

async function saveToDB() {
  const books = await fetchAll();
  await Books.bulkCreate(books);
  console.log('抓取数据并保存到了数据库');
}

saveToDB();