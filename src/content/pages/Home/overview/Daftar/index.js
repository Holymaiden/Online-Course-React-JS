import { Button, CardMedia, Container, Grid, Typography } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

function Daftar() {
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
            Daftarkan Diri Anda
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ '& button': { px: 10, m: 1 } }}>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} item>
              <CardMedia
                sx={{ width: 1 / 2, display: 'inline' }}
                component="img"
                image="/static/images/overview/daftardiri.svg"
                alt="camp"
              />
              <Typography
                textAlign="center"
                sx={{
                  fontSize: {
                    lg: 18,
                    sm: 8,
                    color: `#796F6F`
                  }
                }}
              >
                Singkirkan kurikulum yang konstan dan membosankan dan atur
                sistem Anda sendiri. Rasakan kegembiraan dan kesenangan mengajar
                dengan bebas.
              </Typography>
              <Button
                variant="contained"
                size="medium"
                sx={{ background: '#39229A', mt: 1 }}
              >
                Instruktur
              </Button>
            </Grid>
            <Grid xs={12} sm={6} item>
              <CardMedia
                sx={{ width: 1 / 2, display: 'inline' }}
                component="img"
                image="/static/images/overview/daftarinstruktur.svg"
                alt="camp"
              />
              <Typography
                textAlign="center"
                sx={{
                  fontSize: {
                    lg: 18,
                    sm: 8,
                    color: `#796F6F`
                  }
                }}
              >
                Rasakan pengalaman belajar bersama kami. Dapatkan, rancang,
                kembangkan, hasilkan dengan apa yang Anda pelajari bersama kami.
              </Typography>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  background: '#FBD15B',
                  color: '#5A47AB',
                  width: '35%',
                  mt: 1
                }}
                component={RouterLink}
                to="/signup"
              >
                Pelajar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Daftar;
