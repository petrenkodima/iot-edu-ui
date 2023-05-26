import React, { useEffect, useRef, useState } from 'react';
import './StandPlayer.css';
import { channel, hostCamera, uuid } from '@app/api/iot-edu/config';

export const StandPlayer: React.FC = () => {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const [srs, setSrc] = useState('');

  const getProtocol = () => {
    return 'http:';
  };

  const getWsUrl = () => {
    const webProtocol = getProtocol();
    let protocol;
    if (webProtocol === 'https:') protocol = 'wss';
    else protocol = 'ws';
    return (
      protocol +
      '://' +
      hostCamera +
      '/stream/' +
      uuid +
      '/channel/' +
      channel +
      '/mse?uuid=' +
      uuid +
      '&channel=' +
      channel
    );
  };

  function startPlay() {
    let mimeCodec;
    let decoded_arr;
    const mseQueue: any[] = [];
    let mseStreamingStarted = false;
    let mseSourceBuffer: SourceBuffer;
    const url = getWsUrl();
    const mse = new MediaSource();
    const pushPacket = () => {
      if (!mseSourceBuffer?.updating) {
        if (mseQueue.length > 0) {
          const packet = mseQueue.shift();
          mseSourceBuffer?.appendBuffer(packet);
        } else {
          mseStreamingStarted = false;
        }
      }
      // if (!!myVideoRef.current && myVideoRef.current.buffered.length > 0) {
      //   if (typeof document.hidden !== 'undefined' && document.hidden) {
      //     myVideoRef.current.currentTime =
      //       myVideoRef.current.buffered.end(myVideoRef.current.buffered.length - 1) - 0.5;
      //   }
      // }
    };
    const readPacket = (packet: any) => {
      console.log(packet);
      if (!mseStreamingStarted) {
        mseSourceBuffer?.appendBuffer(packet);
        mseStreamingStarted = true;
        return;
      }
      mseQueue.push(packet);
      if (!mseSourceBuffer?.updating) {
        pushPacket();
      }
    };
    setSrc(window.URL.createObjectURL(mse));
    mse.addEventListener(
      'sourceopen',
      function () {
        const ws = new WebSocket(url);
        ws.binaryType = 'arraybuffer';
        ws.onopen = function (event) {
          console.log('Connect to ws');
        };
        ws.onmessage = function (event) {
          const data = new Uint8Array(event.data);
          if (data[0] == 9) {
            decoded_arr = data.slice(1);
            if (window.TextDecoder) {
              mimeCodec = new TextDecoder('utf-8').decode(decoded_arr);
            } else {
              // mimeCodec = Utf8ArrayToStr(decoded_arr);
              mimeCodec = Buffer.from(decoded_arr.buffer).toString();
            }
            mseSourceBuffer = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"');
            if (mseSourceBuffer !== undefined) {
              mseSourceBuffer.mode = 'segments';
            }
            mseSourceBuffer?.addEventListener('updateend', pushPacket);
          } else {
            readPacket(event.data);
          }
        };
      },
      false,
    );
  }

  myVideoRef.current?.addEventListener('loadeddata', () => {
    myVideoRef.current?.play();
  });
  //
  // document.getElementById('videoPlayer').addEventListener('pause', () => {
  //   if (
  //     document.getElementById('videoPlayer').currentTime >
  //     document.getElementById('videoPlayer').buffered.end(document.getElementById('videoPlayer').buffered.length - 1)
  //   ) {
  //     document.getElementById('videoPlayer').currentTime =
  //       document
  //         .getElementById('videoPlayer')
  //         .buffered.end(document.getElementById('videoPlayer').buffered.length - 1) - 0.1;
  //     document.getElementById('videoPlayer').play();
  //   }
  // });
  //
  // document.getElementById('videoPlayer').addEventListener('error', () => {
  //   console.log('video_error');
  // });

  useEffect(() => {
    startPlay();

    return () => {
      //todo ws close
    };
  }, []);
  return (
    <div
      style={{
        // background: 'rgba(0,150,136,0.27)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '800px',
        height: '400px',
        borderRadius: '20px',
        position: 'relative',
      }}
    >
      <video
        // style={{ backgroundColor: 'red', position: 'absolute' }}
        autoPlay
        src={srs}
        ref={myVideoRef}
        muted
        playsInline
        width={'800px'}
        height={'400px'}
      />
      {/*//todo play or stop btn*/}
      {/*<span id="play-button-container">*/}
      {/*  <span className="play-button play-button-before"></span>*/}
      {/*  <span className="play-button play-button-after"></span>*/}
      {/*</span>*/}
    </div>
  );
};
