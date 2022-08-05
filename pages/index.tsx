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
    <Box
      width='92%'
      marginX='auto'
      marginY='8%'
      display='flex'
      flexDirection='column'
      gap={9}
    >
      <Box>
        <Typography variant='h3' textAlign='center' fontWeight='300'>
          Jobs list using GraphQL&apos;s jobs API ✨
        </Typography>
        <Typography
          variant='subtitle2'
          textAlign='center'
          color='#4a2512'
          marginTop={1}
        >
          (created with passion by{' '}
          <Link
            sx={{ color: '#a1785c', textDecorationColor: '#a1785c' }}
            href='https://github.com/lindsaycode05'
            target='_blank'
          >
            Lindsay
          </Link>{' '}
          for{' '}
          <Link
            sx={{ color: '#a1785c', textDecorationColor: '#a1785c' }}
            target='_blank'
            href='https://jobbatical.com'
          >
            Jobbatical)
          </Link>
        </Typography>
      </Box>

      {jobs.map((job) => (
        <Box
          key={job.id}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          paddingY={5}
          paddingX={9}
          borderRadius={10}
          sx={{ backgroundColor: job.isFeatured ? '#ffe484ba' : '#faf0e6' }}
        >
          <Box display='flex' flexDirection='column' gap={4}>
            <Box display='flex' alignItems='center' gap={1.2}>
              {job.isFeatured && (
                <Chip
                  label={'FEATURED'}
                  sx={{ backgroundColor: '#4a2512', color: '#faf0e6' }}
                />
              )}
              <Chip
                label={job.commitment.title}
                variant='outlined'
                sx={{ backgroundColor: '#a1785c', color: '#faf0e6' }}
              />
            </Box>
            <Box display='flex' alignItems='center' gap={3.2}>
              <Avatar
                sx={{ width: 70, height: 70 }}
                alt='company'
                src={job.company.logoUrl}
              />
              <Box display='flex' flexDirection='column'>
                <Typography sx={{ typography: { xs: 'body1', md: 'h6' } }}>
                  {job.title}
                </Typography>
                <Link
                  marginTop={0.3}
                  target='_blank'
                  href={job.company.websiteUrl}
                  sx={{
                    color: '#4a2512',
                    textDecorationColor: '#4a2512',
                    typography: { xs: 'body2', md: 'body1' },
                  }}
                >
                  {job.company.name}
                </Link>
                <Typography
                  variant='body2'
                  marginTop={1}
                  sx={{ display: { md: 'none' } }}
                >
                  {job.locationNames}
                </Typography>
                <Link
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    backgroundColor: '#4a2512',
                    color: '#faf0e6',
                    padding: 1.3,
                    textDecoration: 'none',
                    borderRadius: 2,
                    transition: '.2s ease',
                    '&:hover': {
                      opacity: 0.9,
                    },
                  }}
                  href={job.applyUrl}
                  marginTop={4.4}
                >
                  Apply Now
                </Link>
              </Box>
            </Box>
          </Box>
          <Typography
            marginTop={5.5}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            {job.locationNames}
          </Typography>
          <Link
            sx={{
              display: { xs: 'none', md: 'block' },
              backgroundColor: '#4a2512',
              color: '#faf0e6',
              padding: 1.3,
              textDecoration: 'none',
              borderRadius: 2,
              transition: '.2s ease',
              '&:hover': {
                opacity: 0.9,
              },
            }}
            href={job.applyUrl}
            marginTop={4.4}
          >
            Apply Now
          </Link>
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
