import React from "react";
import { Typography, Grid, Paper, ButtonBase } from "@material-ui/core";

const torrents = [
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "1080p",
    provider: "YTS",
    filesize: "1.48 GB",
    size: 1589137900,
    peer: 59,
    seed: 122,
    url:
      "magnet:?xt=urn:btih:AC4B3E0AC1535F6D66C58374EF2624A7D77863B4&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  },
  {
    language: "en",
    quality: "720p",
    provider: "YTS",
    filesize: "782.39 MB",
    size: 820395377,
    peer: 22,
    seed: 83,
    url:
      "magnet:?xt=urn:btih:A2AC349364F43A234023A689586E8E975D692D4D&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  }
];

const MovieTorrents = (_: any) => {
  return (
    <>
      <Typography variant="h4" style={{ color: "white" }}>
        torrents
      </Typography>
      <Grid
        container
        style={{
          //   //   minHeight: "-webkit-fill-available",
          //   backgroundImage:
          //     "radial-gradient(circle at 10% 20%, rgba(90, 92, 106, 0.24) 0%, rgba(32, 45, 58, 0.2) 81.3%)",
          //   borderRadius: "10px",
          //   flexGrow: 1
          maxHeight: "20vh",
          overflow: "scroll"
        }}
      >
        {torrents.map((torrent: any, index: number) => {
          return (
            <ButtonBase style={{ minWidth: "-moz-available", height: "50px" }}>
              <Paper
                key={`torrent-index${index}`}
                style={{
                  minWidth: "-moz-available",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                audio:{" "}
                {torrent.language === "fr" ? <span>🇫🇷</span> : <span>🇬🇧</span>}{" "}
                | {torrent.quality} | {torrent.seed} seeds | {torrent.peer} peer
              </Paper>
            </ButtonBase>
          );
        })}
      </Grid>
    </>
  );
};

export default MovieTorrents;
