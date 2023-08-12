import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native';
import * as size from '../components/FontSize';
import LinearGradient from 'react-native-linear-gradient';
export default function FAQ() {
  return (
    <LinearGradient
    colors={[
      '#525461',
      '#343643',
      '#222431',
      '#1B1D2A',
      '#1B1D2A',
      '#1B1D2A',
    ]}
    style={{flex: 1}}>
      <ScrollView contentContainerStyle={{paddingHorizontal:10,gap:10,marginTop:20,paddingBottom:30}}>
        
        <Text>
          {<Text style={styles.title}> FAQ for Chaak App</Text>}
          {`\n`}
          {`\n`}

          {
            <Text style={styles.question}>
              What are the type of experiences I will be getting?
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              {' '}
              The experiences that we offer Chaak members are specifically
              curated to be memorable, experiences that are unique. You can
              check out our website for a better indication.
            </Text>
          }
          {`\n`}
          {
            <Text style={styles.question}>How do I collect Chaak points?</Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              {' '}
              There are various ways to collect Chaak points and the main four
              ways are:
            </Text>
          }
          {`\n`}
          {
            <Text style={styles.answer}>
              {' '}
              Take a picture at a Kachaak! Photo Booth{' '}
            </Text>
          }
          {`\n`}
          {
            <Text style={styles.answer}>
              Scan the Kachaak! Photo Booth’s QR code at participating outlets
              when participating in a Chaak activation{' '}
            </Text>
          }
          {`\n`}
          {
            <Text style={styles.answer}>
              {' '}
              Scan receipts of your purchase at retail and f&b outlets with
              Kachaak! Photo Booths on their premises{' '}
            </Text>
          }
          {`\n`}
          {
            <Text style={styles.answer}>
              {' '}
              Write up reviews of your experiences at retail and f&b outlets
              with Kachaak! Photo Booths on their premises{' '}
            </Text>
          }
          {`\n`}
          {
            <Text style={styles.answer}>
              {' '}
              There are also other ways to collect Chaak points and they are on
              the app{' '}
            </Text>
          }
          {`\n`}
          {
            <Text style={styles.question}>
              I receive a notication on Rain Alert - What is it?
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              {' '}
              The Rain Alert is an activation where retail and f&b outlets offer
              discounts on their products and menu on rainy days in Singapore.{' '}
            </Text>
          }
          {`\n`}
          {
            <Text style={styles.question}>
              I receive a notication on End-of-Day Sale - What is it?
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              {' '}
              The End-of-Day Sale is an activation where retail and f&b outlets
              offer highly favorable discounts on their products and menu at the
              end of the operating hours to avoid wastage on perishable goods,
              and slow-moving stock.{' '}
            </Text>
          }
          {`\n`}
          {
            <Text style={styles.question}>
              I receive a notication on All-day Sunshine - What is it?
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              {' '}
              The All-day Sunshine is an activation, over a period of time
              (usually a week to a month), where retail and f&b outlets offer
              discounts on their products and menu.{' '}
            </Text>
          }
          {`\n`}
          {
            <Text style={styles.question}>
              Why is it that I can only go to the restaurant after 45 mins?
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              Some activations are reactionary, like the Rain Alert that is
              activated on rainy days only. So, the 45-mins lead time is to
              allow the participating outlets and stores to make preparations.{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.question}>Where do I scan the QR code? </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              QR Codes are dentifiers on every Kachaak! Photo Booth that
              indicates the location of the booth. You will find them on the top
              left side, next to the tablet.{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.question}>
              What do I get if I scan the QR code?{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              As a Chaak member, scanning the QR code during activations will
              get you Chaak points which you collect to redeem for Chaak
              Experiences via the app.{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.question}>
              What are the rewards which I am getting?{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              Our rewards are designed and curated to be experiential, and we
              call them Chaak Experiences. We have a saying, “It’s only worth
              doing if it’s memorable,” and that is what we bring Chaak members,
              memorable experiences. So expect not some discount on ice cream
              but an eat all you can ice-cream buffet. How about a 30-minute
              float-on-air session, dining in the sky,{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.question}>
              How can I join the Community Chaak App?{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              It’s simple; download the Chaak app from Google Play Store or The
              Apple, join by filling out your profile, and start collecting
              Chaak Points by taking pictures at Kachaak! photo booths.{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.question}>
              How do users collect Chaak points?{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.question}>
              How do users collect Chaak points?{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              There are various ways to collect Chaak points. You can take
              photos at Kachaak! Photo Booths, scan your receipts at from
              restaurants and retail outlets with Kachaak! Photo Booths,
              participate in activations by scanning QR codes on the Kachaak!
              Photo Booths.{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.question}>
              What benefits and privileges do users get by being a part of the
              Community Chaak App?{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              Chaak members stand to benefit from discout privileges at
              restaurants and retails outlets{' '}
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.question}>
              Does the Chaak App provide job opportunities for digital marketers
              and social media marketers?
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              The Chaak app has a jobs listing section and in it are job
              placements that is extended to our clients. So it really depends
              on what our clients are looking for, digital and social media
              marketers included. Chaak members are encouraged to check in from
              time to time as the list changes often.
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.question}>
              How do you apply for a job in the Chaak App?
            </Text>
          }{' '}
          {`\n`}
          {
            <Text style={styles.answer}>
              The process for jobs application is simple, we do not veto any
              candidates on behalf of the advertiser and link you straight to
              them.
            </Text>
          }{' '}
          {`\n`}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {color: 'white', fontSize: size.Xlarge(),marginBottom:30},
  question: {color: '#00BBB4', fontSize: size.large()},
  answer: {color: 'white', fontSize: size.medium()},
});
