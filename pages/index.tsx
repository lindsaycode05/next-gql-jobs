import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import { Box } from '@mui/material';

interface IJob {
  jobs: {
    id: string;
    title: string;
    locationNames: string;
    description: string;
    commitment: { title: string };
    applyUrl: string;
    isFeatured: boolean;
    company: {
      logoUrl: string;
      name: string;
      websiteUrl: string;
    };
  }[];
}

const Home: NextPage<IJob> = ({ jobs }) => {
  return (
    <Box>
      {jobs.map((job) => (
        <Box key={job.id}></Box>
      ))}
    </Box>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Jobs {
        jobs {
          id
          title
          locationNames
          description
          commitment {
            title
          }
          applyUrl
          isFeatured
          company {
            logoUrl
            name
            websiteUrl
          }
        }
      }
    `,
  });

  return {
    props: {
      jobs: data.jobs,
    },
  };
}

export default Home;
