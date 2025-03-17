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
]

const FLAG_CALL_FRAMES = [
    require('../assets/animations/Flag-Call-000.png'),
    require('../assets/animations/Flag-Call-001.png'),
    require('../assets/animations/Flag-Call-002.png'),
    require('../assets/animations/Flag-Call-003.png'),
    require('../assets/animations/Flag-Call-004.png'),
    require('../assets/animations/Flag-Call-005.png'),
    require('../assets/animations/Flag-Call-006.png'),
    require('../assets/animations/Flag-Call-007.png'),
    require('../assets/animations/Flag-Call-008.png'),
    require('../assets/animations/Flag-Call-009.png'),
    require('../assets/animations/Flag-Call-010.png'),
    require('../assets/animations/Flag-Call-011.png'),
    require('../assets/animations/Flag-Call-012.png'),
    require('../assets/animations/Flag-Call-013.png'),
    require('../assets/animations/Flag-Call-014.png'),
    require('../assets/animations/Flag-Call-015.png'),
    require('../assets/animations/Flag-Call-016.png'),
    require('../assets/animations/Flag-Call-017.png'),
    require('../assets/animations/Flag-Call-018.png'),
    require('../assets/animations/Flag-Call-019.png'),
    require('../assets/animations/Flag-Call-020.png'),
    require('../assets/animations/Flag-Call-021.png'),
    require('../assets/animations/Flag-Call-022.png'),
    require('../assets/animations/Flag-Call-023.png'),
    require('../assets/animations/Flag-Call-024.png'),
    require('../assets/animations/Flag-Call-025.png'),
    require('../assets/animations/Flag-Call-026.png'),
    require('../assets/animations/Flag-Call-027.png'),
    require('../assets/animations/Flag-Call-028.png'),
    require('../assets/animations/Flag-Call-029.png'),
    require('../assets/animations/Flag-Call-030.png'),
    require('../assets/animations/Flag-Call-031.png'),
    require('../assets/animations/Flag-Call-032.png'),
    require('../assets/animations/Flag-Call-033.png'),
    require('../assets/animations/Flag-Call-034.png'),
    require('../assets/animations/Flag-Call-035.png'),
    require('../assets/animations/Flag-Call-036.png'),
    require('../assets/animations/Flag-Call-037.png'),
    require('../assets/animations/Flag-Call-038.png'),
    require('../assets/animations/Flag-Call-039.png'),
    require('../assets/animations/Flag-Call-040.png'),
    require('../assets/animations/Flag-Call-041.png'),
    require('../assets/animations/Flag-Call-042.png'),
    require('../assets/animations/Flag-Call-043.png'),
    require('../assets/animations/Flag-Call-044.png'),
    require('../assets/animations/Flag-Call-045.png'),
    require('../assets/animations/Flag-Call-046.png'),
    require('../assets/animations/Flag-Call-047.png'),
    require('../assets/animations/Flag-Call-048.png'),
    require('../assets/animations/Flag-Call-049.png'),
    require('../assets/animations/Flag-Call-050.png'),
    require('../assets/animations/Flag-Call-051.png'),
    require('../assets/animations/Flag-Call-052.png'),
    require('../assets/animations/Flag-Call-053.png'),
    require('../assets/animations/Flag-Call-054.png'),
    require('../assets/animations/Flag-Call-055.png'),
    require('../assets/animations/Flag-Call-056.png'),
    require('../assets/animations/Flag-Call-057.png'),
    require('../assets/animations/Flag-Call-058.png'),
    require('../assets/animations/Flag-Call-059.png'),
    require('../assets/animations/Flag-Call-060.png'),
    require('../assets/animations/Flag-Call-061.png'),
    require('../assets/animations/Flag-Call-062.png'),
    require('../assets/animations/Flag-Call-063.png'),
    require('../assets/animations/Flag-Call-064.png'),
    require('../assets/animations/Flag-Call-065.png'),
    require('../assets/animations/Flag-Call-066.png'),
    require('../assets/animations/Flag-Call-067.png'),
    require('../assets/animations/Flag-Call-068.png'),
    require('../assets/animations/Flag-Call-069.png'),
    require('../assets/animations/Flag-Call-070.png'),
    require('../assets/animations/Flag-Call-071.png'),
    require('../assets/animations/Flag-Call-072.png'),
    require('../assets/animations/Flag-Call-073.png'),
    require('../assets/animations/Flag-Call-074.png'),
    require('../assets/animations/Flag-Call-075.png'),
    require('../assets/animations/Flag-Call-076.png'),
    require('../assets/animations/Flag-Call-077.png'),
    require('../assets/animations/Flag-Call-078.png'),
    require('../assets/animations/Flag-Call-079.png'),
    require('../assets/animations/Flag-Call-080.png'),
    require('../assets/animations/Flag-Call-081.png'),
    require('../assets/animations/Flag-Call-082.png'),
    require('../assets/animations/Flag-Call-083.png'),
    require('../assets/animations/Flag-Call-084.png'),
    require('../assets/animations/Flag-Call-085.png'),
    require('../assets/animations/Flag-Call-086.png'),
    require('../assets/animations/Flag-Call-087.png'),
    require('../assets/animations/Flag-Call-088.png'),
    require('../assets/animations/Flag-Call-089.png'),
    require('../assets/animations/Flag-Call-090.png'),
    require('../assets/animations/Flag-Call-091.png'),
    require('../assets/animations/Flag-Call-092.png'),
    require('../assets/animations/Flag-Call-093.png'),
    require('../assets/animations/Flag-Call-094.png'),
    require('../assets/animations/Flag-Call-095.png'),
    require('../assets/animations/Flag-Call-096.png'),
    require('../assets/animations/Flag-Call-097.png'),
    require('../assets/animations/Flag-Call-098.png'),
    require('../assets/animations/Flag-Call-099.png'),
    require('../assets/animations/Flag-Call-100.png'),
    require('../assets/animations/Flag-Call-101.png'),
    require('../assets/animations/Flag-Call-102.png'),
    require('../assets/animations/Flag-Call-103.png'),
    require('../assets/animations/Flag-Call-104.png'),
    require('../assets/animations/Flag-Call-105.png'),
    require('../assets/animations/Flag-Call-106.png'),
    require('../assets/animations/Flag-Call-107.png'),
    require('../assets/animations/Flag-Call-108.png'),
    require('../assets/animations/Flag-Call-109.png'),
    require('../assets/animations/Flag-Call-110.png'),
    require('../assets/animations/Flag-Call-111.png'),
    require('../assets/animations/Flag-Call-112.png'),
    require('../assets/animations/Flag-Call-113.png'),
    require('../assets/animations/Flag-Call-114.png'),
    require('../assets/animations/Flag-Call-115.png'),
    require('../assets/animations/Flag-Call-116.png'),
    require('../assets/animations/Flag-Call-117.png'),
    require('../assets/animations/Flag-Call-118.png'),
    require('../assets/animations/Flag-Call-119.png'),
    require('../assets/animations/Flag-Call-120.png'),
    require('../assets/animations/Flag-Call-121.png'),
    require('../assets/animations/Flag-Call-122.png'),
    require('../assets/animations/Flag-Call-123.png'),
    require('../assets/animations/Flag-Call-124.png'),
]

interface LookPhoneCallAnimationProps {
    style?: object
}

const LookPhoneCallAnimation: React.FC<LookPhoneCallAnimationProps> = ({
    style = {},
}) => {
    const [currentFrame, setCurrentFrame] = useState(0)
    const [stage, setStage] = useState<'look' | 'getPhone' | 'loop'>('look')

    useEffect(() => {
        let frameInterval: NodeJS.Timeout
        let frameRate: number

        if (stage === 'look') {
            frameRate = 40
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
            frameRate = 40
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
            frameRate = 40
            frameInterval = setInterval(() => {
                setCurrentFrame((prev) => (prev + 1) % FLAG_CALL_FRAMES.length)
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
                    : FLAG_CALL_FRAMES[currentFrame]
            }
            style={style}
        />
    )
}

export default LookPhoneCallAnimation
