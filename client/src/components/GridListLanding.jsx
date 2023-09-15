import React from 'react'
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockIcon from '@mui/icons-material/Lock';




const CustomCard = ({ heading, description, icon, href }) => {
    return (
        <Box
            maxW={{ base: 'full', md: '275px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            px={5}
            py={14}
            bg={'white'}
            boxShadow={'md'}
            _hover={{
                boxShadow: "lg",
                transform: "scale(1.01)"
            }}>
            <Stack align={'center'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={useColorModeValue('cyan.200', 'white')}>
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading align={'center'} size="md">{heading}</Heading>
                    <Text align={'center'} mt={3} fontSize={'sm'}>
                        <em>{description}</em>
                    </Text>
                </Box>
            </Stack>
        </Box>
    )
}

const GridListLanding = () => {
    return (
        <Box p={4} pb={36} pt={36} bgGradient={'linear(to-b, #00B5D8,  #FFFFFF)'} id="features">
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                    Why should you choose Vaad?
                </Heading>
                <Text color={'gray.700'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    Vaad has several features that would make you doubt you of existing options!
                </Text>
            </Stack>

            <Container maxW={'5xl'} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    <CustomCard
                        heading={'Easy To Use'}
                        icon={<Icon as={EmojiEmotionsIcon} w={10} h={10} />}
                        description={' "Simplicity at Your Fingertips"'}
                        href={'#'}
                    />
                    <CustomCard
                        heading={'Real Time'}
                        icon={<Icon as={AccessTimeIcon} w={10} h={10} />}
                        description={'"Stay Connected in the Moment"'}
                        href={'#'}
                    />
                    <CustomCard
                        heading={'Safety & Privacy'}
                        icon={<Icon as={LockIcon} w={10} h={10} />}
                        description={'"Your Security, Our Priority"'}
                        href={'#'}
                    />
                </Flex>
            </Container>
        </Box>
    )
}

export default GridListLanding