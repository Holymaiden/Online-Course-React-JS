import { Button, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { getPopularCourse } from '../../../../../Api/Course';

import { Link as RouterLink } from 'react-router-dom';

function Popular() {
  const [popular, SetPopular] = useState([]);

  useEffect(() => {
    getPopularCourse().then(function (result) {
      SetPopular(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ textAlign: 'center', pt: 10, mb: 10 }}
      style={{ color: '#ffffff' }}
    >
      <Grid
        spacing={{ xs: 12 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item xs={12}>
          <Typography
            fontWeight="medium"
            textAlign="center"
            sx={{
              fontSize: {
                lg: 45,
                md: 40,
                sm: 35,
                xs: 30,
                color: `#5A47AB`
              }
            }}
          >
            Popular Course
          </Typography>
          <Typography
            fontWeight="medium"
            textAlign="center"
            sx={{
              fontSize: {
                lg: 20,
                xs: 15
              },
              color: `#796F6F`
            }}
          >
            Temukan materi belajar dengan mudah tentang apa yang Anda inginkan
            dan mulailah belajar.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {popular
              ? popular.map((datas) => (
                  <Grid
                    xs={12}
                    sm={4}
                    container
                    justifyContent="center"
                    alignItems="center"
                    mt={5}
                  >
                    <Grid xs={6} item>
                      <CardMedia
                        sx={{ width: 1 / 2, display: 'inline' }}
                        component="img"
                        image="/static/images/overview/contoh.svg"
                        alt="camp"
                      />
                    </Grid>
                    <Grid xs={6} item>
                      <Typography
                        textAlign="left"
                        sx={{
                          fontSize: {
                            lg: 20,
                            sm: 10,
                            color: `#5A47AB`
                          },
                          fontWeight: 'bold',
                          mb: 1
                        }}
                      >
                        {datas.title}
                      </Typography>
                      <Typography
                        textAlign="left"
                        sx={{
                          fontSize: {
                            lg: 18,
                            sm: 8,
                            color: `#796F6F`
                          }
                        }}
                      >
                        {datas.description}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Popular;
