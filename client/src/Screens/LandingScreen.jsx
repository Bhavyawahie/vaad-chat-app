import React from 'react'
import Header from '../components/Header'
import {
    Image,
    Box,
    Button,
    Heading,
    Container,
    Flex,
    Text,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    useMediaQuery
} from '@chakra-ui/react'


import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockIcon from '@mui/icons-material/Lock';
import GridListLanding from '../components/GridListLanding'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import Footer from '../components/Footer'
import mockup from '../img/mockup.png'



const LandingScreen = () => {
    const [isSmallerThan1024] = useMediaQuery('(max-width: 1025px)')
    return (
        <>
            <Header location={{pathname: '/'}} />
            <HeroSection/>
            <Flex direction={'column'} align={'center'} bgGradient={'linear(to-t, #00B5D8,  #FFFFFF)'}>
                <Image w={'1020px'} mb={0} px={isSmallerThan1024 && 4} borderRadius={'10px'} boxShadow={"xl"}  zIndex={'10'} src={mockup}/>
            </Flex>
            <GridListLanding/>
            <Features/>
            <Footer/>
        </>
    )
}

export default LandingScreen