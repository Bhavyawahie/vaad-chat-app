import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import { AbsoluteCenter, Box, Button,  Divider, Flex, Heading, Image, Input, Link as ChakraLink,  useToast, Stack, FormControl, FormLabel, FormErrorMessage, useMediaQuery } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { USER_LOGIN_RESET } from '../constants/userConstants'
import GoogleSSO from '../components/GoogleSSO'
import { Link } from 'react-router-dom'


const HomeScreen = ({ history, location }) => {
    const [isLargerThan1440] = useMediaQuery('(min-width: 1439px)')
    const toast = useToast()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [onError, setOnError] = useState({
        email: false,
        password: false
    })
    const ref = useRef()
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin

    const changeHandler = (e) => {
        const { name, value } = e.target
        setInput(prevVal => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }

    const validateForm = () => {
        const errorValidation = {
            email: true,
            password: true
        }

        if (!input.email) {
            errorValidation.email = false;
        }

        if (!input.password) {
            errorValidation.password = false;
        }

        return errorValidation;
    }


    const submitHandler = (e) => {
        e.preventDefault();
        const errorValidation = validateForm();

        if (errorValidation.email && errorValidation.password) {
            dispatch(login(input));
        } else {
            // Handle validation errors here (e.g., display error messages)
            if (!errorValidation.email) {
                setOnError((state) => {
                    return { ...state, ['email']: true }
                })
            }

            if (!errorValidation.password) {
                setOnError((state) => {
                    return { ...state, ['password']: true }
                })
            }
        }
    }

    useEffect(() => {
        const focusInput = () => {
            ref.current.focus();
        }
        focusInput();
    }, [])

    useEffect(() => {
        if (input.email.length > 0) {
            setOnError((state) => {
                return { ...state, ['email']: false }
            })
        }
        if (input.password.length > 0) {
            setOnError((state) => {
                return { ...state, ['password']: false }
            })
        }
    }, [input])

    useEffect(() => {
        if (userInfo) {
            history.push('/chats')
        }
    }, [userInfo, history])

    return (
        <>
            <Header location={location} />
            {error && (() => {
                toast({ position: "top-right", title: `${error}`, status: "error", isClosable: true, duration: "4000" })
                dispatch({ type: USER_LOGIN_RESET })
            })()
            }

            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} justify={!isLargerThan1440 && 'center'}>
                <Flex direction='column' w={'full'} maxW={'2xl'} p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'4xl'}>Welcome back</Heading>
                        <Heading fontSize={'md'}>Sign in to your account</Heading>
                        <GoogleSSO />
                        <Box position='relative'>
                            <Divider />
                            <AbsoluteCenter bg='white' color={"grey"} px='4'>
                                or
                            </AbsoluteCenter>
                        </Box>
                        <FormControl id="email" isInvalid={onError.email}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" ref={ref} name='email' value={input.email} onChange={(e) => changeHandler(e)} />
                            {onError.email && <FormErrorMessage>Email is required.</FormErrorMessage>}
                        </FormControl>
                        <FormControl id="password" isInvalid={onError.password}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name='password' value={input.password} onChange={(e) => changeHandler(e)} />
                            {onError.password && <FormErrorMessage>Password is required.</FormErrorMessage>}
                        </FormControl>
                        <Stack spacing={6}>
                            <Button colorScheme={'cyan'} variant={'solid'} onClick={(e) => submitHandler(e)}>
                                Sign in
                            </Button>
                            <Flex justify='center' color={'grey'}>Don't have an account?<Link to={'/register'}><ChakraLink color={'blackAlpha.800'}> &nbsp;Sign Up Now</ChakraLink></Link></Flex>
                        </Stack>
                    </Stack>
                </Flex>
                {isLargerThan1440 && <Flex flex={1}>
                    <Image
                        alt={'Login Image'}
                        objectFit={'cover'}
                        src={
                            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                        }
                    />
                </Flex>}
            </Stack>
        </>
    )
}

export default HomeScreen
