import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'

const LOOK_RIGHT_FRAMES = [
    require('../assets/animations/Look-Right-00.png'),
    require('../assets/animations/Look-Right-01.png'),
    require('../assets/animations/Look-Right-02.png'),
    require('../assets/animations/Look-Right-03.png'),
    require('../assets/animations/Look-Right-04.png'),
    require('../assets/animations/Look-Right-05.png'),
    require('../assets/animations/Look-Right-06.png'),
    require('../assets/animations/Look-Right-07.png'),
    require('../assets/animations/Look-Right-08.png'),
    require('../assets/animations/Look-Right-09.png'),
    require('../assets/animations/Look-Right-10.png'),
    require('../assets/animations/Look-Right-11.png'),
    require('../assets/animations/Look-Right-12.png'),
]

const GET_PHONE_FRAMES = [
    require('../assets/animations/Get-Phone-00.png'),
    require('../assets/animations/Get-Phone-01.png'),
    require('../assets/animations/Get-Phone-02.png'),
    require('../assets/animations/Get-Phone-03.png'),
    require('../assets/animations/Get-Phone-04.png'),
    require('../assets/animations/Get-Phone-05.png'),
    require('../assets/animations/Get-Phone-06.png'),
    require('../assets/animations/Get-Phone-07.png'),
    require('../assets/animations/Get-Phone-08.png'),
    require('../assets/animations/Get-Phone-09.png'),
    require('../assets/animations/Get-Phone-10.png'),
    require('../assets/animations/Get-Phone-11.png'),
    require('../assets/animations/Get-Phone-12.png'),
    require('../assets/animations/Get-Phone-13.png'),
    require('../assets/animations/Get-Phone-14.png'),
    require('../assets/animations/Get-Phone-15.png'),
    require('../assets/animations/Get-Phone-16.png'),
    require('../assets/animations/Get-Phone-17.png'),
    require('../assets/animations/Get-Phone-18.png'),
    require('../assets/animations/Get-Phone-19.png'),
    require('../assets/animations/Get-Phone-20.png'),
    require('../assets/animations/Get-Phone-21.png'),
    require('../assets/animations/Get-Phone-22.png'),
    require('../assets/animations/Get-Phone-23.png'),
    require('../assets/animations/Get-Phone-24.png'),
]

const FLAG_MESSAGE_FRAMES = [
    require('../assets/animations/Flag-Message-000.png'),
    require('../assets/animations/Flag-Message-001.png'),
    require('../assets/animations/Flag-Message-002.png'),
    require('../assets/animations/Flag-Message-003.png'),
    require('../assets/animations/Flag-Message-004.png'),
    require('../assets/animations/Flag-Message-005.png'),
    require('../assets/animations/Flag-Message-006.png'),
    require('../assets/animations/Flag-Message-007.png'),
    require('../assets/animations/Flag-Message-008.png'),
    require('../assets/animations/Flag-Message-009.png'),
    require('../assets/animations/Flag-Message-010.png'),
    require('../assets/animations/Flag-Message-011.png'),
    require('../assets/animations/Flag-Message-012.png'),
    require('../assets/animations/Flag-Message-013.png'),
    require('../assets/animations/Flag-Message-014.png'),
    require('../assets/animations/Flag-Message-015.png'),
    require('../assets/animations/Flag-Message-016.png'),
    require('../assets/animations/Flag-Message-017.png'),
    require('../assets/animations/Flag-Message-018.png'),
    require('../assets/animations/Flag-Message-019.png'),
    require('../assets/animations/Flag-Message-020.png'),
    require('../assets/animations/Flag-Message-021.png'),
    require('../assets/animations/Flag-Message-022.png'),
    require('../assets/animations/Flag-Message-023.png'),
    require('../assets/animations/Flag-Message-024.png'),
    require('../assets/animations/Flag-Message-025.png'),
    require('../assets/animations/Flag-Message-026.png'),
    require('../assets/animations/Flag-Message-027.png'),
    require('../assets/animations/Flag-Message-028.png'),
    require('../assets/animations/Flag-Message-029.png'),
    require('../assets/animations/Flag-Message-030.png'),
    require('../assets/animations/Flag-Message-031.png'),
    require('../assets/animations/Flag-Message-032.png'),
    require('../assets/animations/Flag-Message-033.png'),
    require('../assets/animations/Flag-Message-034.png'),
    require('../assets/animations/Flag-Message-035.png'),
    require('../assets/animations/Flag-Message-036.png'),
    require('../assets/animations/Flag-Message-037.png'),
    require('../assets/animations/Flag-Message-038.png'),
    require('../assets/animations/Flag-Message-039.png'),
    require('../assets/animations/Flag-Message-040.png'),
    require('../assets/animations/Flag-Message-041.png'),
    require('../assets/animations/Flag-Message-042.png'),
    require('../assets/animations/Flag-Message-043.png'),
    require('../assets/animations/Flag-Message-044.png'),
    require('../assets/animations/Flag-Message-045.png'),
    require('../assets/animations/Flag-Message-046.png'),
    require('../assets/animations/Flag-Message-047.png'),
    require('../assets/animations/Flag-Message-048.png'),
    require('../assets/animations/Flag-Message-049.png'),
    require('../assets/animations/Flag-Message-050.png'),
    require('../assets/animations/Flag-Message-051.png'),
    require('../assets/animations/Flag-Message-052.png'),
    require('../assets/animations/Flag-Message-053.png'),
    require('../assets/animations/Flag-Message-054.png'),
    require('../assets/animations/Flag-Message-055.png'),
    require('../assets/animations/Flag-Message-056.png'),
    require('../assets/animations/Flag-Message-057.png'),
    require('../assets/animations/Flag-Message-058.png'),
    require('../assets/animations/Flag-Message-059.png'),
    require('../assets/animations/Flag-Message-060.png'),
    require('../assets/animations/Flag-Message-061.png'),
    require('../assets/animations/Flag-Message-062.png'),
    require('../assets/animations/Flag-Message-063.png'),
    require('../assets/animations/Flag-Message-064.png'),
    require('../assets/animations/Flag-Message-065.png'),
    require('../assets/animations/Flag-Message-066.png'),
    require('../assets/animations/Flag-Message-067.png'),
    require('../assets/animations/Flag-Message-068.png'),
    require('../assets/animations/Flag-Message-069.png'),
    require('../assets/animations/Flag-Message-070.png'),
    require('../assets/animations/Flag-Message-071.png'),
    require('../assets/animations/Flag-Message-072.png'),
    require('../assets/animations/Flag-Message-073.png'),
    require('../assets/animations/Flag-Message-074.png'),
    require('../assets/animations/Flag-Message-075.png'),
    require('../assets/animations/Flag-Message-076.png'),
    require('../assets/animations/Flag-Message-077.png'),
    require('../assets/animations/Flag-Message-078.png'),
    require('../assets/animations/Flag-Message-079.png'),
    require('../assets/animations/Flag-Message-080.png'),
    require('../assets/animations/Flag-Message-081.png'),
    require('../assets/animations/Flag-Message-082.png'),
    require('../assets/animations/Flag-Message-083.png'),
    require('../assets/animations/Flag-Message-084.png'),
    require('../assets/animations/Flag-Message-085.png'),
    require('../assets/animations/Flag-Message-086.png'),
    require('../assets/animations/Flag-Message-087.png'),
    require('../assets/animations/Flag-Message-088.png'),
    require('../assets/animations/Flag-Message-089.png'),
    require('../assets/animations/Flag-Message-090.png'),
    require('../assets/animations/Flag-Message-091.png'),
    require('../assets/animations/Flag-Message-092.png'),
    require('../assets/animations/Flag-Message-093.png'),
    require('../assets/animations/Flag-Message-094.png'),
    require('../assets/animations/Flag-Message-095.png'),
    require('../assets/animations/Flag-Message-096.png'),
    require('../assets/animations/Flag-Message-097.png'),
    require('../assets/animations/Flag-Message-098.png'),
    require('../assets/animations/Flag-Message-099.png'),
    require('../assets/animations/Flag-Message-100.png'),
    require('../assets/animations/Flag-Message-101.png'),
    require('../assets/animations/Flag-Message-102.png'),
    require('../assets/animations/Flag-Message-103.png'),
    require('../assets/animations/Flag-Message-104.png'),
    require('../assets/animations/Flag-Message-105.png'),
    require('../assets/animations/Flag-Message-106.png'),
    require('../assets/animations/Flag-Message-107.png'),
    require('../assets/animations/Flag-Message-108.png'),
    require('../assets/animations/Flag-Message-109.png'),
    require('../assets/animations/Flag-Message-110.png'),
    require('../assets/animations/Flag-Message-111.png'),
    require('../assets/animations/Flag-Message-112.png'),
    require('../assets/animations/Flag-Message-113.png'),
    require('../assets/animations/Flag-Message-114.png'),
    require('../assets/animations/Flag-Message-115.png'),
    require('../assets/animations/Flag-Message-116.png'),
    require('../assets/animations/Flag-Message-117.png'),
    require('../assets/animations/Flag-Message-118.png'),
    require('../assets/animations/Flag-Message-119.png')
]

interface LookPhoneMessageAnimationProps {
    style?: object
}

const LookPhoneMessageAnimation: React.FC<LookPhoneMessageAnimationProps> = ({
    style = {},
}) => {
    const [currentFrame, setCurrentFrame] = useState(0)
    const [stage, setStage] = useState<'look' | 'getPhone' | 'loop'>('look')

    useEffect(() => {
        let frameInterval: NodeJS.Timeout
        let frameRate: number

        if (stage === 'look') {
            frameRate = 80 // Slower speed (0.5x)
            frameInterval = setInterval(() => {
                setCurrentFrame((prev) => {
                    if (prev < LOOK_RIGHT_FRAMES.length - 1) {
                        return prev + 1
                    } else {
                        clearInterval(frameInterval)
                        setStage('getPhone')
                        return 0
                    }
                })
            }, frameRate)
        } else if (stage === 'getPhone') {
            frameRate = 40 // Normal speed (1x)
            frameInterval = setInterval(() => {
                setCurrentFrame((prev) => {
                    if (prev < GET_PHONE_FRAMES.length - 1) {
                        return prev + 1
                    } else {
                        clearInterval(frameInterval)
                        setStage('loop')
                        return 0
                    }
                })
            }, frameRate)
        } else {
            frameRate = 80 // Slower speed (0.5x)
            frameInterval = setInterval(() => {
                setCurrentFrame((prev) => (prev + 1) % FLAG_MESSAGE_FRAMES.length)
            }, frameRate)
        }

        return () => clearInterval(frameInterval)
    }, [stage])

    return (
        <Image
            source={
                stage === 'look'
                    ? LOOK_RIGHT_FRAMES[currentFrame]
                    : stage === 'getPhone'
                    ? GET_PHONE_FRAMES[currentFrame]
                    : FLAG_MESSAGE_FRAMES[currentFrame]
            }
            style={style}
        />
    )
}

export default LookPhoneMessageAnimation
