import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { getSortedPostsData } from "../lib/posts";
Amplify.configure(awsconfig);

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const [data, setData] = useState([]);

  // useEffect(async () => {
  //   const { data } = await API.graphql(graphqlOperation(listTodos));
  //   console.log("#", data);
  //   setData(data.listTodos.items);
  // }, []);

  useEffect(() => {}, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSave = async () => {
    try {
      // const a = await API.graphql(
      //   graphqlOperation(createTodo, { input: values })
      // );
      await fetch(`http://www.instagram.com/${values.name}/?__a=1`)
        .then((res) => res.json())
        .then((data) => {
          console.log("#", data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("#", data);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Hello, and welcome to my world!</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        {data?.map((i) => (
          <>
            <p>{i.name}</p>
            <p>{i.description}</p>{" "}
          </>
        ))}
      </section>
      <section>
        <input value={values.name} name="name" onChange={handleChange} />
        <input
          value={values.description}
          name="description"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSave}>
          Save
        </button>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
