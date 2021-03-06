import {
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  lighten,
  CardActions,
  Button,
  IconButton,
  CardActionArea
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { getPopularCourse } from '../../../../../Api/Course';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaymentIcon from '@mui/icons-material/Payment';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';

import {
  varFadeInUp,
  varFadeInDown,
  MotionInView
} from '../../../../../components/animate';

function Course() {
  const navigate = useNavigate();
  const [popular, SetPopular] = useState([]);

  useEffect(() => {
    getPopularCourse(8).then(function (result) {
      result.data = result.data.sort(() => Math.random() - 0.8);
      SetPopular(result.data);
    });
  }, [navigate]);

  return (
    <Container
      maxWidth="lg"
      sx={{ textAlign: 'center', pt: 10, mb: 10 }}
      style={{ color: '#ffffff' }}
    >
      <Grid
        spacing={{ xs: 3 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item xs={12}>
          <MotionInView variants={varFadeInDown}>
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
              Kursus Lainnya
            </Typography>
          </MotionInView>
        </Grid>
        <Grid item xs={12}>
          <MotionInView variants={varFadeInUp}>
            <Grid container>
              {popular
                ? popular.map((datas) => (
                    <Grid
                      xs={12}
                      lg={2.6}
                      mt={5}
                      mx={2}
                      item
                      border={1}
                      borderColor="#F2F2F2"
                    >
                      <CardActionArea
                        onClick={() => {
                          navigate('/materi/' + datas.slug);
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{ maxWidth: 255, maxHeight: 146 }}
                          image={
                            datas.image
                              ? datas.image
                              : '/static/images/overview/anu.svg'
                          }
                          alt="camp"
                        />
                        <CardContent>
                          <Typography
                            textAlign="left"
                            sx={{
                              fontSize: {
                                lg: 12,
                                sm: 8,
                                color: `#796F6F`
                              },
                              mb: 1
                            }}
                          >
                            {datas.category_title}
                          </Typography>
                          <Typography
                            textAlign="left"
                            sx={{
                              fontSize: {
                                lg: 15,
                                sm: 10,
                                color: `#5A47AB`
                              },
                              fontWeight: 'bold'
                            }}
                          >
                            {datas.title}
                          </Typography>
                          <Typography
                            textAlign="left"
                            sx={{
                              fontSize: {
                                lg: 15,
                                sm: 8,
                                color: `#796F6F`
                              }
                            }}
                          >
                            {datas.username}
                          </Typography>
                        </CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            pl: 1.7
                          }}
                        >
                          <PaymentIcon
                            style={{
                              color: '#5A47AB'
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: {
                                lg: 12,
                                sm: 8,
                                color: `#5A47AB`
                              },
                              pl: 0.5
                            }}
                          >
                            Rp. {datas.price.toLocaleString()}
                          </Typography>
                        </Box>
                        <CardActions sx={{ justifyContent: 'space-between' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              pl: 0.7
                            }}
                          >
                            <AccessTimeIcon style={{ color: '#796F6F' }} />
                            <Typography
                              sx={{
                                fontSize: {
                                  lg: 12,
                                  sm: 8,
                                  color: '#796F6F'
                                },
                                pl: 0.5
                              }}
                            >
                              3 hr
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <LocalActivityIcon style={{ color: '#23BA29' }} />
                            <Typography
                              sx={{
                                fontSize: {
                                  lg: 12,
                                  sm: 8,
                                  color: `#23BA29`
                                },
                                pl: 0.5
                              }}
                            >
                              4.5
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: {
                                  lg: 12,
                                  sm: 8,
                                  color: '#796F6F'
                                },
                                pl: 0.5
                              }}
                            >
                              (300)
                            </Typography>
                          </Box>
                        </CardActions>
                      </CardActionArea>
                    </Grid>
                  ))
                : null}
            </Grid>
          </MotionInView>
        </Grid>
        <MotionInView variants={varFadeInDown}>
          <Button
            variant="contained"
            sx={{ mt: 5 }}
            onClick={() => navigate('/kursus')}
          >
            Selengkapnya
          </Button>
        </MotionInView>
      </Grid>
    </Container>
  );
}

export default Course;
