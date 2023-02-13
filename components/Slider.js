import { 
    View, 
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    Animated,
    ScrollView,
    Dimensions
} from 'react-native'
import React,{useState,useRef} from 'react'
import slideData from '../utils/HomeSliderData'

const Slider = () => {
    const { width, height } = Dimensions.get("window");

    const newSlideScrollX = useRef(new Animated.Value(0)).current;
    function renderSlideShow(){
        return(
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={width}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                contentContainerStyle={{
                    marginTop:12
                }}
                data={slideData}
                keyExtractor={(item,index)=>String(index)}
                onScroll={Animated.event([
                    {nativeEvent:{contentOffset: {x:
                    newSlideScrollX } } }
                ],{useNativeDriver:false })}

                renderItem={({item,index}) => {
                    return(
                            <View style={{
                                width:width,
                                alignItems:'center',
                                justifyContent:'center'

                            }}>

                                <ImageBackground
                                    source={{uri:item?.image && item.image}}
                                    resizeMode='cover'
                                    style={{
                                        width:width * 0.85,
                                        height:width * 0.40,
                                        justifyContent:'flex-end',

                                    }}
                                    imageStyle={{
                                        borderRadius:5
                                    }}
                                >
                                    <View style={{
                                        flexDirection:'column',
                                        height:60,
                                        width:'100%',
                                        marginBottom:12,
                                        paddingHorizontal:12,
                                    }}>
                                        {/* image title  */}
                                        
                                            {item?.title && <Text style={{marginLeft:8,marginBottom:10,color:'#fff',fontSize:20,fontWeight:'800'}}>{item.title}</Text>}
                                    
                                            {item?.desc && <Text style={{marginLeft:8 ,color:'#9b849c',fontSize:12,fontWeight:'800'}}>{item.desc}</Text>}                                        

                                    </View>

                                </ImageBackground>

                            </View>

                    )
                }}
            />
        )
    }

    function renderDots(){
        const dotPosition = Animated.divide(newSlideScrollX,width)
        return(
            <View style={{
                marginTop:24,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            }}>
                {slideData.map((item,index)=>{
                    const opacity = dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:[0.3,1,0.3],
                        extrapolate:'clamp'
                    })

                    const dotWidth= dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:[6,20,6],
                        extrapolate:'clamp'
                    })

                    const dotColor = dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:['#dedede','yellow','#dedede'],
                        extrapolate:'clamp'
                    })
                    return(
                        <Animated.View 
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={{
                                borderRadius:12,
                                marginHorizontal:3,
                                width:dotWidth,
                                height:6,
                                backgroundColor: dotColor
                            }}
                        />
                    )
                })}

            </View>
        )
    }
    
  return (
    <View className="mb-4">
      {renderSlideShow()}

      {renderDots()}
    </View>
  )
}

export default Slider