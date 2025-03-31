import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import NotificationSearch from './notification-search'
import { useState } from 'react'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import { StyleSheet,Text } from 'react-native';
const routes = [
    { key: 'all', title: 'All' },
    { key: 'news', title: 'News' },
    { key: 'activity', title: 'Activity' },
    { key: 'alerts', title: 'Alerts' }
]

const All = (): React.ReactNode => {
    return <NotificationSearch type={'All'} />
}

const News = (): React.ReactNode => {
    return <NotificationSearch type={'News'} />
}

const Activity = (): React.ReactNode => {
    return <NotificationSearch type={'Activity'} />
}

const Alerts = (): React.ReactNode => {
    return <NotificationSearch type={'Alerts'} />
}

const renderScene = SceneMap({
    all: All,
    news: News,
    activity: Activity,
    alerts: Alerts
})

const Notifications = (): React.JSX.Element => {
    const [index, setIndex] = useState(0)
    return (
        <>
             <Box className="m-5">
                <Heading
                    size="2xl"
                    style={{ fontFamily: 'Montserrat-Bold', }}
                    className="color-[#1C1C1C]"
                >
                    Notifications
                </Heading>
                
            </Box>
            <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            style={{ backgroundColor: '#0A2941', padding:5 }}

                        />
                    )}
                    style={{margin:10, borderRadius:20}}
            />
        </>
    )
}
const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: 'white',
    },
    labelStyle: {
      fontSize: 18,
      fontFamily: 'Roboto-Bold', //
      
    },
  });

export default Notifications
