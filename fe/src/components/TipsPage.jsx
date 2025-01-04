import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, Link } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Navbar from './Navbar';

const TipsPage = () => {
  return (
    <Box>
      {/* Navbar */}
      <Navbar />

      <Box
        sx={{
          display: 'flex',          
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          width: '100%',
          background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
          padding: '30px',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: '#1e88e5',
            marginBottom: 4,
            textAlign: 'center',
            fontSize: { xs: '2rem', sm: '2.5rem' },
            letterSpacing: '1px',
            maxWidth: '100%',
          }}
        >
          Tips Pencegahan Stroke
        </Typography>

        {/* Gambar Ilustrasi */}
        <Box
          component="img"
          src="assets/pencegahan.png"
          alt="Ilustrasi Pencegahan Stroke"
          sx={{
            width: '100%',
            maxWidth: '600px',
            borderRadius: '15px',
            marginBottom: 4,
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
            objectFit: 'cover',
          }}
        />

        {/* Deskripsi Pendahuluan */}
        <Typography
          variant="body1"
          sx={{
            color: '#555',
            textAlign: 'center',
            maxWidth: '800px',
            fontSize: '1.2rem',
            marginBottom: 4,
            lineHeight: '1.8',
            fontStyle: 'italic',
          }}
        >
          Stroke merupakan salah satu penyebab utama kematian dan kecacatan di seluruh dunia. 
          Pencegahan stroke tidak hanya mengurangi risiko, tetapi juga meningkatkan kualitas hidup secara keseluruhan. 
          Berikut adalah beberapa langkah penting yang dapat Anda ambil untuk menjaga kesehatan otak dan mencegah stroke:
        </Typography>

        {/* Tips Pencegahan dalam List */}
        <List
          sx={{
            width: '100%',
            maxWidth: '800px',
            bgcolor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            padding: '25px',
            marginBottom: 4,
          }}
        >
          <ListItem sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: '#43a047', fontSize: '30px' }} />
            </ListItemIcon>
            <ListItemText
              primary="Pola Makan Sehat"
              secondary={
                <>
                  Konsumsi makanan yang kaya serat seperti sayur, buah, biji-bijian, dan kacang-kacangan. Hindari makanan tinggi lemak jenuh, gula, serta garam berlebihan.{' '}
                  <Link href="https://www.halodoc.com/artikel/7-tips-menerapkan-pola-makan-sehat-yang-mudah-dilakukan?srsltid=AfmBOooMLCn4J1w5Euak3p10l_-cqQlG9Wrd6jCPvAciS01uLYlZW9su" target="_blank" sx={{ color: '#1e88e5', textDecoration: 'underline' }}>
                    Pelajari lebih lanjut
                  </Link>
                </>
              }
              primaryTypographyProps={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}
              secondaryTypographyProps={{ color: '#555' }}
            />
          </ListItem>

          <ListItem sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: '#43a047', fontSize: '30px' }} />
            </ListItemIcon>
            <ListItemText
              primary="Rutin Berolahraga"
              secondary={
                <>
                  Lakukan olahraga aerobik seperti jalan cepat, jogging, atau bersepeda setidaknya 30 menit per hari untuk meningkatkan kesehatan jantung dan pembuluh darah.{' '}
                  <Link href="https://www.halodoc.com/kesehatan/olahraga?srsltid=AfmBOoq3MS4KBnX8RYX9wx-JnqE3b718JpI5K7-bZL1rl9ecxkyCQA4b" target="_blank" sx={{ color: '#1e88e5', textDecoration: 'underline' }}>
                    Pelajari lebih lanjut
                  </Link>
                </>
              }
              primaryTypographyProps={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}
              secondaryTypographyProps={{ color: '#555' }}
            />
          </ListItem>

          <ListItem sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: '#43a047', fontSize: '30px' }} />
            </ListItemIcon>
            <ListItemText
              primary="Hindari Kebiasaan Merokok dan Alkohol"
              secondary={
                <>
                  Merokok dapat merusak pembuluh darah, sementara konsumsi alkohol berlebihan meningkatkan tekanan darah dan risiko stroke.{' '}
                  <Link href="https://www.mountelizabeth.com.sg/id/health-plus/article/how-smoking-and-drinking-affects-the-body" target="_blank" sx={{ color: '#1e88e5', textDecoration: 'underline' }}>
                    Pelajari lebih lanjut
                  </Link>
                </>
              }
              primaryTypographyProps={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}
              secondaryTypographyProps={{ color: '#555' }}
            />
          </ListItem>

          <ListItem sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: '#43a047', fontSize: '30px' }} />
            </ListItemIcon>
            <ListItemText
              primary="Kontrol Tekanan Darah, Gula, dan Kolesterol"
              secondary={
                <>
                  Rutin periksa ke dokter untuk memantau tekanan darah, kadar gula darah, dan kolesterol agar tetap dalam batas normal.{' '}
                  <Link href="https://www.halodok.com/artikel/cara-tepat-mengecek-gula-darah-dan-kolesterol-di-rumah?srsltid=AfmBOoqNbc86JrkbfuCXlNwaA4DeyuMcX9ojdliT8oHDvl8Gs-Q7_p23#google_vignette" target="_blank" sx={{ color: '#1e88e5', textDecoration: 'underline' }}>
                    Pelajari lebih lanjut
                  </Link>
                </>
              }
              primaryTypographyProps={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}
              secondaryTypographyProps={{ color: '#555' }}
            />
          </ListItem>

          <ListItem sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: '#43a047', fontSize: '30px' }} />
            </ListItemIcon>
            <ListItemText
              primary="Kelola Stres"
              secondary={
                <>
                  Teknik relaksasi seperti meditasi, yoga, atau mendengarkan musik dapat membantu mengurangi stres dan menjaga tekanan darah tetap stabil.{' '}
                  <Link href="https://www.alodokter.com/ternyata-tidak-sulit-mengatasi-stres" target="_blank" sx={{ color: '#1e88e5', textDecoration: 'underline' }}>
                    Pelajari lebih lanjut
                  </Link>
                </>
              }
              primaryTypographyProps={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}
              secondaryTypographyProps={{ color: '#555' }}
            />
          </ListItem>

          <ListItem sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: '#43a047', fontSize: '30px' }} />
            </ListItemIcon>
            <ListItemText
              primary="Tidur yang Cukup"
              secondary={
                <>
                  Pastikan Anda mendapatkan tidur berkualitas selama 6–8 jam setiap malam untuk membantu tubuh memulihkan energi dan menjaga kesehatan otak.{' '}
                  <Link href="https://www.alodokter.com/9-manfaat-istirahat-dan-tidur-yang-cukup" target="_blank" sx={{ color: '#1e88e5', textDecoration: 'underline' }}>
                    Pelajari lebih lanjut
                  </Link>
                </>
              }
              primaryTypographyProps={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}
              secondaryTypographyProps={{ color: '#555' }}
            />
          </ListItem>
        </List>

        {/* Additional Information Card */}
        <Card
          sx={{
            maxWidth: '800px',
            backgroundColor: '#f5f5f5',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            marginBottom: 4,
            padding: '20px',
            width: '100%',  // Ensures it doesn't overflow
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#1e88e5',
                marginBottom: 2,
              }}
            >
              Gejala Stroke yang Harus Diwaspadai
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#555',
                lineHeight: '1.8',
              }}
            >
              Jika Anda atau seseorang yang Anda kenal mengalami gejala seperti kebingungan, kesulitan berbicara atau memahami pembicaraan, 
              mati rasa atau kelemahan pada wajah, lengan, atau kaki, segera dapatkan perawatan medis. 
              Waktu adalah kunci untuk mencegah kerusakan otak lebih lanjut.
            </Typography>
          </CardContent>
        </Card>

        {/* Penutup */}
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            textAlign: 'center',
            marginTop: 4,
            fontSize: '1rem',
            fontStyle: 'italic',
            maxWidth: '100%',
          }}
        >
          Dengan mengikuti tips ini secara konsisten, Anda dapat mengurangi risiko stroke dan meningkatkan kesehatan Anda secara keseluruhan.
        </Typography>
      </Box>
    </Box>
  );
};

export default TipsPage;
