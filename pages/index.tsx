import type { NextPage } from 'next';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import { Avatar, Box, Button, Chip, Link, Typography } from '@mui/material';

interface IJob {
  jobs: {
    id: string;
    title: string;
    locationNames: string;
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
        <Box key={job.id} display='flex' alignItems='center'>
          <Box display='flex' flexDirection='column'>
            <Box display='flex' alignItems='center'>
              <Chip label={job.isFeatured && 'FEATURED'} />
              <Chip label={job.commitment.title} variant='outlined' />
            </Box>
            <Avatar alt='company' src={job.company.logoUrl} />
          </Box>
          <Box display='flex' flexDirection='column'>
            <Typography>{job.title}</Typography>
            <Link target='_blank' href={job.company.websiteUrl}>
              {job.company.name}
            </Link>
          </Box>
          <Box display='flex' flexDirection='column'>
            <Typography>{job.locationNames}</Typography>
          </Box>
          <Box>
            <Link href={job.applyUrl}>Apply Now</Link>
          </Box>
        </Box>
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
