import React from 'react';
import styles from './HomePage.module.scss';
import Grid from "../components/UI/Grid";
import Card from "../components/UI/Card";
import PrivateContent from "../components/routing/PrivateContent";

const HomePage = (props) => {
  return (
    <PrivateContent>
      <div className={styles.home}>
        <h1> Welcome </h1>
        <p> App-wide State with React Context </p>

        <Grid className={styles.grid}>
          <a href="https://nextjs.org/docs">
            <Card>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </Card>
          </a>
          <a href="https://nextjs.org/learn">
            <Card>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </Card>
          </a>
          <a href="https://github.com/vercel/next.js/tree/master/examples">
            <Card>
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </Card>
          </a>
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <Card>
              <h2>Deploy &rarr;</h2>
              <p> Instantly deploy your Next.js site to a public URL with Vercel. </p>
            </Card>
          </a>
        </Grid>


      </div>
    </PrivateContent>
  )
};

export default HomePage;
