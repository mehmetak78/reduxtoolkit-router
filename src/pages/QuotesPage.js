import {Fragment} from "react";
import {useEffect} from 'react';

import QuoteList from '../../components/quotes/QuoteList';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import NoQuotesFound from '../../components/quotes/NoQuotesFound';
import useHttp from '../../hooks/use-http';
import {getAllQuotes} from '../../helpers/QuotesHelper';

import styles from './quotes.module.scss'

const QuotesPage = () => {
  const {sendRequest, status, data: loadedQuotes, error} = useHttp(
    getAllQuotes,
    true
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let pageContent;

  if (status === 'pending') {
    pageContent =
      <div className={styles.centered}>
        <LoadingSpinner/>
      </div>

  } else if (error) {
    pageContent = <p className={`${styles.centered} ${styles.focused}`}>{error}</p>;
  } else if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    pageContent = <NoQuotesFound/>;
  } else {
    pageContent = <QuoteList quotes={loadedQuotes}/>;
  }

  return (
    <Fragment>
      {pageContent}
    </Fragment>)
};

export default QuotesPage;
