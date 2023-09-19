import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button, Center, Text } from '@chakra-ui/react'

const GoogleSSO = () => {
    return (
        <Center py={8}>
            <Button w={'100%'}  variant={'outline'} leftIcon={<FontAwesomeIcon icon={faGoogle} />}>
                <Center>
                    <Text>Continue with Google</Text>
                </Center>
            </Button>
        </Center>
    )
}

export default GoogleSSO