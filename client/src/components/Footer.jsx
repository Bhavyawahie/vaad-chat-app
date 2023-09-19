import React from 'react'
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


const SocialButton = ({children,label,href,}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    )
}

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text>© {year} Bhavya Wahie. All rights reserved</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Facebook'} href={'https://facebook.com/bhavyawahie'} target='_blank'>
                        <FontAwesomeIcon icon={faFacebook} /> 
                    </SocialButton>
                    <SocialButton label={'Instagram'} href={'https://instagram.com/bhavyawahie'}>
                        <FontAwesomeIcon icon={faInstagram} />
                    </SocialButton>
                    <SocialButton label={'Twitter'} href={'https://twitter.com/bhavyawahie'}>
                        <FontAwesomeIcon icon={faXTwitter} />
                    </SocialButton>
                    <SocialButton label={'Github'} href={'https://github.com/bhavyawahie'}>
                        <FontAwesomeIcon icon={faGithub}/>
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    )
}

export default Footer