-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 22, 2021 at 04:20 AM
-- Server version: 5.7.30
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `AaqlFWLEt4`
--

-- --------------------------------------------------------

--
-- Table structure for table `ADMIN`
--

CREATE TABLE `ADMIN` (
  `idAdmin` int(11) NOT NULL,
  `phanQuyen` int(11) NOT NULL COMMENT '1: Quan tri vien, 2: NV quan ly, 3: NV tiep tan',
  `tenAdmin` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ADMIN`
--

INSERT INTO `ADMIN` (`idAdmin`, `phanQuyen`, `tenAdmin`) VALUES
(3, 3, 'Trang Tran'),
(5, 1, 'Trieu Uy Phu'),
(6, 2, 'Tran Van Hung'),
(7, 3, 'Dam Tuan Kiet');

-- --------------------------------------------------------

--
-- Table structure for table `CHITIETDATDICHVU`
--

CREATE TABLE `CHITIETDATDICHVU` (
  `idCTDDV` int(11) NOT NULL,
  `donGia` double NOT NULL,
  `hinhThuc` int(11) NOT NULL,
  `soLuong` int(11) NOT NULL,
  `idDDV` int(11) NOT NULL,
  `idDV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `CHITIETDONDATPHONG`
--

CREATE TABLE `CHITIETDONDATPHONG` (
  `idCTDDP` int(11) NOT NULL,
  `donGia` int(11) NOT NULL,
  `idDDP` int(11) NOT NULL,
  `idLP` int(11) NOT NULL,
  `soLuong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `CHITIETDONDATPHONG`
--

INSERT INTO `CHITIETDONDATPHONG` (`idCTDDP`, `donGia`, `idDDP`, `idLP`, `soLuong`) VALUES
(1, 100, 1, 1, 2),
(2, 100, 5, 1, 1),
(3, 600, 1, 2, 1),
(4, 600, 2, 2, 1),
(5, 600, 3, 2, 1),
(6, 350, 4, 3, 2),
(7, 350, 5, 3, 1),
(8, 70, 15, 1, 1),
(9, 350, 15, 3, 1),
(10, 350, 16, 3, 1),
(11, 70, 20, 1, 1),
(12, 350, 20, 3, 2),
(13, 350, 21, 3, 1),
(14, 500, 21, 2, 1),
(15, 70, 22, 1, 2),
(16, 30, 23, 2, 1),
(17, 350, 23, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `CHITIETPHIEUTHANHTOAN`
--

CREATE TABLE `CHITIETPHIEUTHANHTOAN` (
  `idCTPTT` int(11) NOT NULL,
  `donGia` double NOT NULL,
  `maPhong` varchar(10) CHARACTER SET utf8 NOT NULL,
  `idPTT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `CHITIETPHIEUTHANHTOAN`
--

INSERT INTO `CHITIETPHIEUTHANHTOAN` (`idCTPTT`, `donGia`, `maPhong`, `idPTT`) VALUES
(1, 100, 'C101', 1),
(2, 100, 'C102', 1),
(3, 600, 'C201', 1),
(4, 600, 'C202', 2),
(5, 600, 'C203', 3),
(6, 350, 'C301', 4),
(7, 350, 'C302', 4),
(8, 70, 'C101', 5),
(9, 350, 'C302', 5),
(10, 350, 'C301', 6),
(11, 500, 'C201', 16),
(12, 350, 'C301', 16),
(13, 70, 'C102', 17),
(14, 70, 'C101', 17),
(15, 30, 'C201', 18),
(16, 350, 'C301', 18);

-- --------------------------------------------------------

--
-- Table structure for table `DICHVU`
--

CREATE TABLE `DICHVU` (
  `idDV` int(11) NOT NULL,
  `tenDV` varchar(50) NOT NULL,
  `hinhThuc` int(11) NOT NULL COMMENT '1: per booking, 2: per person per date, 3: free',
  `donGia` double NOT NULL DEFAULT '0',
  `moTaTD` text NOT NULL,
  `moTaCT` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `DICHVU`
--

INSERT INTO `DICHVU` (`idDV`, `tenDV`, `hinhThuc`, `donGia`, `moTaTD`, `moTaCT`) VALUES
(1, 'Valentine Package', 1, 50, 'Share an unforgettable romantic moment for Valentine\'s Day in Paris ! ', 'Select the Special Valentine’s Day Package for only 50€ extra including : \r\n- 1/2 bottle of Champagne \r\n- Roses \r\n- Macarons.'),
(2, 'Breakfast', 2, 7, 'Our EXPRESS BREAKFAST on the tray is served in your room only, between 7:00 am and 10:30 am.', 'This includes:\r\n1 hot drink,\r\n1 orange juice and\r\n1 basket of pastries.\r\nThe breakfast is prepared by our team and served on a tray in order to respect barrier gestures, to protect yourself and others from coronavirus.'),
(3, 'Pressreader', 3, 0, 'Connecting People through News.', 'All-you-can-read digital newsstand with thousands of the world\'s most popular newspapers and magazines.'),
(4, 'Free international Phone calls', 3, 0, 'Free international Phone calls', 'Free international Phone calls'),
(5, 'Party', 2, 200, 'Let\'s party', 'This is a test');

-- --------------------------------------------------------

--
-- Table structure for table `DONDATDICHVU`
--

CREATE TABLE `DONDATDICHVU` (
  `idDDDV` int(11) NOT NULL,
  `ngayDat` date NOT NULL,
  `tongThanhTien` int(11) NOT NULL,
  `trangThai` int(11) NOT NULL COMMENT '1: chưa thanh toán, 2: đã thanh toán',
  `idPTP` int(11) NOT NULL,
  `idKHD` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DONDATPHONG`
--

CREATE TABLE `DONDATPHONG` (
  `idDDP` int(11) NOT NULL,
  `ngayDen` date NOT NULL,
  `ngayDi` date NOT NULL,
  `soDem` int(11) NOT NULL,
  `ngayDatPhong` date NOT NULL,
  `tongThanhTien` double NOT NULL,
  `trangThaiDat` int(11) NOT NULL DEFAULT '0' COMMENT '0: đang xử lý, 1: hủy, 2:hoàn tất',
  `idKHD` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `DONDATPHONG`
--

INSERT INTO `DONDATPHONG` (`idDDP`, `ngayDen`, `ngayDi`, `soDem`, `ngayDatPhong`, `tongThanhTien`, `trangThaiDat`, `idKHD`) VALUES
(1, '2021-06-13', '2021-06-18', 5, '2021-06-12', 4000, 0, 5),
(2, '2021-06-23', '2021-06-23', 7, '2021-06-14', 4200, 0, 7),
(3, '2021-06-24', '2021-06-26', 5, '2021-06-15', 3000, 0, 5),
(4, '2021-06-25', '2021-06-22', 5, '2021-06-13', 3500, 1, 13),
(5, '2021-01-08', '2021-01-10', 2, '2021-01-06', 2500, 0, 55),
(6, '2021-01-17', '2021-01-21', 4, '2021-01-13', 5000, 0, 34),
(7, '2021-02-04', '2021-02-09', 5, '2021-02-01', 5000, 1, 24),
(8, '2021-02-18', '2021-02-24', 6, '2021-10-02', 5500, 1, 23),
(9, '2021-03-21', '2021-03-22', 1, '2021-03-19', 500, 1, 13),
(10, '2021-03-28', '2021-03-31', 3, '2021-03-25', 1500, 1, 10),
(11, '2021-04-01', '2021-04-05', 4, '2021-03-31', 2000, 0, 55),
(12, '2021-04-15', '2021-04-20', 5, '2021-04-08', 5000, 0, 34),
(13, '2021-05-08', '2021-05-15', 7, '2021-05-01', 6000, 1, 24),
(14, '2021-05-20', '2021-05-28', 8, '2021-05-11', 6500, 1, 23),
(15, '2021-07-04', '2021-07-06', 2, '2021-06-28', 840, 0, 130),
(16, '2021-07-05', '2021-07-12', 4, '2021-06-30', 1400, 0, 130),
(20, '2021-07-11', '2021-07-14', 3, '2021-07-02', 2310, 0, 24),
(21, '2021-07-15', '2021-07-19', 4, '2021-07-04', 3400, 0, 10),
(22, '2021-07-18', '2021-07-21', 3, '2021-07-08', 420, 0, 21),
(23, '2021-07-20', '2021-07-23', 3, '2021-07-09', 1140, 0, 13);

-- --------------------------------------------------------

--
-- Table structure for table `GIATHEONGAY`
--

CREATE TABLE `GIATHEONGAY` (
  `idGTN` int(11) NOT NULL,
  `ngayBatDau` date NOT NULL,
  `giaMoiTuan` double NOT NULL,
  `idLP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `GIATHEONGAY`
--

INSERT INTO `GIATHEONGAY` (`idGTN`, `ngayBatDau`, `giaMoiTuan`, `idLP`) VALUES
(2, '2021-06-11', 500, 2),
(3, '2021-06-06', 210, 2),
(4, '2021-06-08', 215, 2),
(5, '2021-06-09', 300, 2),
(6, '2021-06-09', 100, 1),
(7, '2021-06-18', 150, 1),
(8, '2021-06-19', 150, 1),
(9, '2021-06-20', 70, 1),
(11, '2021-06-10', 350, 3),
(12, '2021-06-26', 450, 7),
(13, '2021-07-17', 1000, 12),
(14, '2021-07-17', 700, 11),
(15, '2021-07-17', 900, 7);

-- --------------------------------------------------------

--
-- Table structure for table `GIATHEOTHU`
--

CREATE TABLE `GIATHEOTHU` (
  `idGTT` int(11) NOT NULL,
  `thu` int(11) NOT NULL,
  `giaTheoThu` double NOT NULL,
  `idGTN` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `GIATHEOTHU`
--

INSERT INTO `GIATHEOTHU` (`idGTT`, `thu`, `giaTheoThu`, `idGTN`) VALUES
(1, 1, 370, 2),
(2, 1, 650, 3),
(4, 3, 35, 2),
(5, 5, 30, 2),
(6, 6, 600, 2),
(7, 0, 1200, 13);

-- --------------------------------------------------------

--
-- Table structure for table `HINHANHDICHVU`
--

CREATE TABLE `HINHANHDICHVU` (
  `idHinhDV` int(11) NOT NULL,
  `hinhAnh` varchar(255) NOT NULL,
  `idDV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `HINHANHDICHVU`
--

INSERT INTO `HINHANHDICHVU` (`idHinhDV`, `hinhAnh`, `idDV`) VALUES
(1, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/Service%2FvalentinePackage01.jpg?alt=media&token=26e9fa0d-77da-41d7-9356-81dabb53c325', 1),
(2, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/Service%2Fbreakfast01.jpg?alt=media&token=9532b510-bb1d-49e7-bcae-54c6d594ea1d', 2),
(3, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/Service%2Fbreakfast02.jpg?alt=media&token=ef5a12a3-2678-4236-8ce5-585598b0023d', 2),
(4, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/Service%2Fbreakfast03.jpg?alt=media&token=4e7aeb92-60cd-4a19-8e34-3f07b22db9fb', 2),
(5, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/Service%2Fbreakfast04.jpg?alt=media&token=96bd07b1-3fc9-40a6-8c3e-9429a7f84c9c', 2),
(6, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/Service%2Fressreader.jpg?alt=media&token=f8dbff71-d544-4785-aa0a-1a34781182b2', 3),
(7, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/Service%2FphoneCalls.jpg?alt=media&token=5bc7b3a5-90db-4965-b783-3782e9125f26', 4),
(11, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/Service%2F1622986142968_coffeehouseSlide2.jpg?alt=media&token=64baf742-ab41-4afb-a1fb-e7a65242e4e6', 5);

-- --------------------------------------------------------

--
-- Table structure for table `HINHANHLOAIPHONG`
--

CREATE TABLE `HINHANHLOAIPHONG` (
  `idHinhLP` int(11) NOT NULL,
  `hinhAnh` varchar(255) NOT NULL,
  `idLP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `HINHANHLOAIPHONG`
--

INSERT INTO `HINHANHLOAIPHONG` (`idHinhLP`, `hinhAnh`, `idLP`) VALUES
(1, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FclassicRoom01.jpg?alt=media&token=ad9dba66-9a48-4f88-9178-327bc54d1cf8', 1),
(2, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FclassicRoom02.jpg?alt=media&token=e297a793-5599-4829-8243-00220a7e3fa1', 1),
(4, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FclassicRoom04.jpg?alt=media&token=dd3ca146-10c8-4d52-aa46-224e03769f7f', 1),
(5, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FclassicRoom05.jpg?alt=media&token=ea3f9bbc-b7ce-44f4-8b33-566bbe718a94', 1),
(6, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FsuperiorRoom01.jpg?alt=media&token=1ef9ab75-8fea-4b77-8e83-36cf325d7c5c', 2),
(7, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FsuperiorRoom02.jpg?alt=media&token=d54766d5-006d-4bae-8b28-9a383a557e6d', 2),
(8, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FsuperiorRoom03.jpg?alt=media&token=7bcfca2f-26da-429c-b3a2-86b800a8acd8', 2),
(9, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FroomElegance01.jpg?alt=media&token=39be99d1-e33b-4ef0-9e44-a32dc898e044', 3),
(10, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FroomElegance02.jpg?alt=media&token=1e505d57-4e7e-406e-a585-9bbca4b144d6', 3),
(11, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FroomElegance03.jpg?alt=media&token=a671455c-f85d-4d95-891b-0ceb497808cd', 3),
(12, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2FroomElegance04.jpg?alt=media&token=5ea051c7-bf68-4178-a759-99555f5ecf8e', 3),
(16, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626521780973_rt_07_01.jpg?alt=media&token=77e1a592-8f3d-44dc-b571-1889faaecc5e', 7),
(17, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626521818790_rt_07_02.jpg?alt=media&token=0e2b5f66-253e-4ddb-b667-d65276737db6', 7),
(18, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626521845156_rt_07_03.jpg?alt=media&token=58ce58cb-5c6d-49cc-9de4-4326d96bea42', 7),
(19, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626521885294_rt_07_04.jpg?alt=media&token=391795aa-39ba-4006-86ef-dcc3e293b9cf', 7),
(20, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626521902273_rt_07_05.jpg?alt=media&token=e8b7c9ea-c90c-4a3a-8e73-cfd1eb26dbe3', 7),
(21, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626522468247_rt_11_01.jpg?alt=media&token=a2330c65-2370-4853-b294-471ec694ff9a', 11),
(22, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626522481646_rt_11_02.jpg?alt=media&token=07cdc9ce-29f3-4c5c-a2db-56eaed8e1599', 11),
(23, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626522493858_rt_11_03.jpg?alt=media&token=e4137c7d-ab09-4e9d-a1d3-c74ca1539b1b', 11),
(24, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626524423179_rt_12_01.jpg?alt=media&token=8a73d17e-6689-4a1e-9e64-a093929598cf', 12),
(25, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626524442029_rt_12_02.jpg?alt=media&token=7c3d1566-cc6d-4547-bc63-1a6ca4bbb404', 12),
(26, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/RoomType%2F1626524452497_rt_12_03.jpg?alt=media&token=90a42dda-e2cb-4d23-a65f-7998d6df3d90', 12);

-- --------------------------------------------------------

--
-- Table structure for table `KHACHHANGDAT`
--

CREATE TABLE `KHACHHANGDAT` (
  `idKHD` int(11) NOT NULL,
  `tenKH` varchar(50) NOT NULL,
  `sdt` varchar(20) DEFAULT NULL,
  `CMND` varchar(20) DEFAULT NULL COMMENT 'KH khi booking sẽ nhập cmnd',
  `Passport` varchar(20) DEFAULT NULL COMMENT 'Kh khi booking sẽ nhập passport'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `KHACHHANGDAT`
--

INSERT INTO `KHACHHANGDAT` (`idKHD`, `tenKH`, `sdt`, `CMND`, `Passport`) VALUES
(5, 'Tran Quoc Hung', '0987999999', '123456789123', NULL),
(7, 'Zayn Jr', '0987654334', NULL, NULL),
(10, 'Đàm Tuấn Kiệt', '0987786655', '998765456788', NULL),
(13, 'Hung Quoc', '09999999999', '563412785645', NULL),
(21, 'Hung Tran', '1234567890', '675849301287', NULL),
(23, 'Hung', '1234567888', NULL, NULL),
(24, 'Dam Tuan Kiet', '09876543242', NULL, NULL),
(34, 'Peter Trieu', '0998877665', NULL, NULL),
(55, 'James Corden', '0999988877', '112233445599', NULL),
(56, 'Hung Hanquoc', NULL, NULL, NULL),
(57, 'Adrian Chan', NULL, NULL, NULL),
(130, 'Adrian Benny Chan ', '0789991876', NULL, NULL),
(181, 'Adrian Chan', NULL, NULL, NULL),
(182, 'Adrian Chan', NULL, NULL, NULL),
(184, 'Adrian Chan', NULL, NULL, NULL),
(216, 'Quốc Hùng Trần', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `KHACHHANGO`
--

CREATE TABLE `KHACHHANGO` (
  `idKHO` int(11) NOT NULL,
  `CMND` varchar(50) NOT NULL,
  `Passport` varchar(50) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `quocGia` varchar(20) NOT NULL,
  `title` varchar(10) NOT NULL,
  `tenKH` varchar(50) NOT NULL,
  `ngaySinh` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `KHACHHANGO`
--

INSERT INTO `KHACHHANGO` (`idKHO`, `CMND`, `Passport`, `sdt`, `quocGia`, `title`, `tenKH`, `ngaySinh`) VALUES
(1, '083277236', '08327723', '0879991888', 'VietNam', 'Mr', 'Nhan Ta', '1821-06-08'),
(2, '0832772344', '08327755', '0789991865', 'China', 'Mr', 'Lam Trieu Anh', '1849-06-07'),
(3, '2902753601', '29027536', '2992553601', 'VietNam', 'Mr', 'Trinh Khai Van', '1999-01-18'),
(4, '2902773602', '29027736', '2992883600', 'VietNam', 'Mr', 'Tran Quoc Hung', '1999-11-23'),
(17, '2902773600', '2902773600', '2902773600', 'Paris', 'Mr', 'Noela Choi', '1988-06-27'),
(18, '0210182777', '02101827', '0210182777', 'America', 'Ms', 'Linda Thang', '1980-04-16'),
(19, '0210182778', '02101826', '0210182778', 'Paris', 'Ms', 'Kim Ly', '2021-07-17'),
(20, '0210182766', '02101823', '0210182766', 'Paris', 'Ms', 'Catherine Ly', '2021-07-17'),
(21, '0210182555', '02101844', '0210182555', 'Netherlands', 'Ms', 'Kim Lien', '2021-07-17'),
(22, '0210182725', '02111727', '0210133212', 'England', 'Mr', 'Nhan Ta', '2021-07-17'),
(23, '6544322864', '65443228', '6544322864', 'Singapore', 'Ms', 'Karon Kim', '2021-07-17'),
(24, '6544323865', '65443225', '6544323864', 'ThaiLand', 'Mr', 'Mixxiw', '2021-07-17'),
(25, '1981153562', '19811535', '1981153562', 'America', 'Ms', 'Alizabeth Olsen', '2021-07-17'),
(26, '0832662366', '08326629', '0832662366', 'China', 'Mr', 'Lamino Pamira', '2021-07-17'),
(27, '0832662355', '08326622', '0832662355', 'Japan', 'Mr', 'Katashi', '2021-07-17');

-- --------------------------------------------------------

--
-- Table structure for table `KHUYENMAI`
--

CREATE TABLE `KHUYENMAI` (
  `idKM` int(11) NOT NULL,
  `dinhMucGia` double NOT NULL,
  `phanTramGiam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `LOAIPHONG`
--

CREATE TABLE `LOAIPHONG` (
  `idLP` int(11) NOT NULL,
  `tenLP` varchar(50) NOT NULL,
  `moTaCT` text NOT NULL COMMENT 'mo ta chi tiet (in)',
  `moTaGT` text NOT NULL COMMENT 'mo ta gioi thieu (in)',
  `moTaTD` text NOT NULL COMMENT 'mo ta tieu de (outside)',
  `hangPhong` float NOT NULL COMMENT 'Can phong may sao',
  `soNguoi` int(11) NOT NULL,
  `giuong` int(11) NOT NULL,
  `phongTam` int(11) NOT NULL,
  `soLuong` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `LOAIPHONG`
--

INSERT INTO `LOAIPHONG` (`idLP`, `tenLP`, `moTaCT`, `moTaGT`, `moTaTD`, `hangPhong`, `soNguoi`, `giuong`, `phongTam`, `soLuong`) VALUES
(1, 'Classic Room', 'Our Classic Rooms, decorated in modern and fashion way, are cozy nests where you can relax and unwind. Though smaller in size12 m2, which is in itself part of their charm, they have large double bed exclusively, Smart TV, telephone, air-conditioning and wireless internet access free. Our Classic rooms are quite even if they are facing the street and our guests love their bathrooms with shower exclusively for their practicality and facilities.', 'These stunningly designed rooms offer guests the delightful view of the Panwa Bay. The rooms are spacious, 70 sqm in size, a king-size bed, and an adjoining living room with a private sea view balcony.', 'Being like a wellness resort, we encourage you to minimize smoking as for your own and other guests’ health benefits.', 3, 2, 1, 1, 5),
(2, 'Superior Room', 'The Superior rooms are inspired by the glamorous and elegant world of 70’s fashion. Each room is unique with its own decoration and furniture, but all in the Modern style. \r\n14 sq. meter / 151 sq. ft in size, all the rooms have 2 beds 90 cm ./3 wide that can be pushed together for a big bed. A bathroom with a shower to end your day in complete relaxation. \r\nAll these rooms overlook the quiet street and allow you to fully appreciate its heritage Haussmanian-style buildings of the 08th District.', 'The Ocean Pavilions, 60 sqm in size, offer a privacy stay amidst the tropical surroundings. Each Ocean Pavilion comprises of an individual bedroom with a king-size bed with sea views.', 'Being a wellness resort, we encourage you to minimize smoking as for your own and other guests’ health benefits.', 3.5, 2, 1, 1, 5),
(3, 'Rooms Elegance', 'Along with the spacious 19 m2 (204 sf) afforded in our Elegance rooms comes the retro chic style of the 1970\'s when Paris was alive with awakened creativity. Beautiful furniture and thoughtful lighting creates a relaxing atmosphere that is unique to our hotel in Paris. The room has 2 single beds which can be joined as a double, and a well equipped private bathroom with shower, a smart TV (with access to Netflix) and a Nespresso coffee machine.', 'Graciously designed, Sea View Suites Each room comprises of an individual bedroom with a king-size bed and an adjoining living room with a balcony overlooking the spectacular seascape.', 'Being a wellness resort, we encourage you to minimize smoking as for your own and other guests’ health benefits.', 5, 2, 1, 1, 5),
(7, 'Tharroe of Mykonos', 'Pitch up at boutique hotel Tharroe of Mykonos to escape or get the party started. Oozing laid-back, arty sophistication, the Tharroe is the perfect base to explore Mykonos that’s reinvented itself as a Greek chic boho hangout for those in-the-know. Celeb-watch at Paradise or Psarou beaches or simply enjoy spectacular poolside views back at the hotel.  Tharroe of Mykonos sits atop a small hill gazing over the Aegean and captures traditional Mykonian romance with a contemporary edge. Rooms and suites are light and airy, mixing fresh, colourful fabrics with classic furniture. ', 'Calling all dog lovers: Tharroe of Mykonos is the only hotel on the island that can accommodate large dogs.', 'With the unpredictability of lockdown restrictions around the world, each of our recommended properties is carefully following their government guidelines in order to provide a safe and reassuring experience for their valued guests.', 4, 3, 4, 2, 5),
(11, 'The Noble House', 'A hotel since the 1920s, The Noble House may be the oldest hotel in Alentejo’s Évora but this 24-room sanctuary in the city is awash with modernity.  Just an hour’s drive from Lisbon, Évora has been a World Heritage Site since 1986 and The Noble House has been a part of the city since the 15th century (its foundations are built upon the first city wall).', 'Historic vestiges alongside modern designer edges in Portugal’s Évora We love...', 'Simple lines and carefully chosen primary colours cleverly complement the 17th-century glazed tiles and vaulted ceilings. Rooms and suites are comfortable and cosy with plenty of natural light.', 3.5, 2, 2, 1, 5),
(12, 'Amarla Boutique', 'There’s an ethereal, otherworldly quality to the seven-room Amarla Boutique Hotel in Colombia’s city that never sleeps. In part, this is due to the hotel’s expertly preserved colonial architecture, artisanal pieces of handmade furnishings by local craftsmen, colourful, original artwork on the walls and silk bathrobes that all add up to create a distinct sense of place and homely atmosphere. The clever use of potted, hanging and climbing plants lends an extra dose of serenity to proceedings.', 'Estella’s breakfasts are prepared from the freshest market produce available that day. This is also true for her delicious picnics that many guests', 'Essentially, it’s all very sweep-you-off-your-feet romantic. And the personal concierge service organises', 5, 2, 2, 2, 9);

-- --------------------------------------------------------

--
-- Table structure for table `PHIEUTHANHTOANPHONG`
--

CREATE TABLE `PHIEUTHANHTOANPHONG` (
  `idPTT` int(11) NOT NULL,
  `ngayThanhToan` date NOT NULL,
  `tinhTrang` int(11) NOT NULL DEFAULT '1' COMMENT '1: chưa thanh toán,2: thanh toán tiền cọc,3: đã thanh toán, 4: Hủy bỏ',
  `tongThanhTien` double NOT NULL,
  `tienPhaiTra` double NOT NULL,
  `tienCoc` double NOT NULL COMMENT '30% tienPhaiTra',
  `tienConLai` double NOT NULL,
  `phanTramGiam` int(11) NOT NULL,
  `idKM` int(11) DEFAULT NULL,
  `idKHD` int(11) NOT NULL,
  `idDDP` int(11) NOT NULL,
  `ngayDen` date NOT NULL,
  `ngayDi` date NOT NULL,
  `soDem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `PHIEUTHANHTOANPHONG`
--

INSERT INTO `PHIEUTHANHTOANPHONG` (`idPTT`, `ngayThanhToan`, `tinhTrang`, `tongThanhTien`, `tienPhaiTra`, `tienCoc`, `tienConLai`, `phanTramGiam`, `idKM`, `idKHD`, `idDDP`, `ngayDen`, `ngayDi`, `soDem`) VALUES
(1, '2021-06-12', 3, 4000, 4000, 1200, 1800, 0, NULL, 5, 1, '2021-06-15', '2021-06-18', 5),
(2, '2021-06-15', 1, 4200, 4200, 1260, 2940, 0, NULL, 7, 2, '2021-06-16', '2021-06-23', 7),
(3, '2021-06-18', 1, 3000, 3000, 900, 2100, 0, NULL, 5, 3, '2021-06-21', '2021-06-26', 5),
(4, '2021-06-15', 3, 3500, 3500, 1050, 2450, 0, NULL, 24, 6, '2021-06-17', '2021-06-22', 5),
(5, '2021-07-01', 1, 840, 840, 252, 588, 0, NULL, 130, 15, '2021-07-04', '2021-07-06', 2),
(6, '2021-07-01', 2, 1400, 1400, 420, 980, 0, NULL, 130, 16, '2021-07-05', '2021-07-12', 4),
(16, '2021-07-07', 2, 3400, 3400, 1020, 2380, 0, NULL, 10, 21, '2021-07-15', '2021-07-19', 4),
(17, '2021-07-09', 1, 420, 420, 126, 294, 0, NULL, 21, 22, '2021-07-18', '2021-07-21', 3),
(18, '2021-07-09', 2, 1140, 1140, 342, 798, 0, NULL, 13, 23, '2021-07-20', '2021-07-23', 3);

-- --------------------------------------------------------

--
-- Table structure for table `PHIEUTHUEPHONG`
--

CREATE TABLE `PHIEUTHUEPHONG` (
  `idPTP` int(11) NOT NULL,
  `ngayDen` date NOT NULL,
  `ngayDi` date NOT NULL,
  `trangThai` int(11) NOT NULL COMMENT '1: Hoàn tất thanh toán\r\n2: Hoàn tất tiền cọc\r\n3: Đã về',
  `maPhong` varchar(10) NOT NULL,
  `idDDP` int(11) NOT NULL,
  `idKHO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `PHIEUTHUEPHONG`
--

INSERT INTO `PHIEUTHUEPHONG` (`idPTP`, `ngayDen`, `ngayDi`, `trangThai`, `maPhong`, `idDDP`, `idKHO`) VALUES
(1, '2021-06-17', '2021-07-18', 3, 'C301', 4, 1),
(2, '2021-06-17', '2021-06-22', 1, 'C302', 4, 2),
(3, '2021-05-07', '2021-12-07', 2, 'C301', 16, 3),
(4, '2021-07-20', '2021-07-23', 2, 'C201', 23, 1),
(5, '2021-07-20', '2021-07-23', 2, 'C301', 23, 20),
(6, '2021-07-05', '2021-07-12', 2, 'C301', 16, 4);

-- --------------------------------------------------------

--
-- Table structure for table `PHONG`
--

CREATE TABLE `PHONG` (
  `maPhong` varchar(10) NOT NULL,
  `soNguoi` int(11) NOT NULL COMMENT 'nap tu chon idLP',
  `idLP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `PHONG`
--

INSERT INTO `PHONG` (`maPhong`, `soNguoi`, `idLP`) VALUES
('C101', 2, 1),
('C102', 2, 1),
('C103', 2, 1),
('C104', 2, 1),
('C105', 2, 1),
('C1101', 2, 11),
('C1102', 2, 11),
('C1103', 2, 11),
('C1104', 2, 11),
('C1105', 2, 11),
('C1201', 2, 12),
('C1202', 2, 12),
('C1203', 2, 12),
('C1204', 2, 12),
('C1205', 2, 12),
('C1206', 2, 12),
('C1207', 2, 12),
('C1208', 2, 12),
('C1209', 2, 12),
('C201', 2, 2),
('C202', 2, 2),
('C203', 2, 2),
('C204', 2, 2),
('C205', 2, 2),
('C301', 2, 3),
('C302', 2, 3),
('C303', 2, 3),
('C304', 2, 3),
('C305', 2, 3),
('C701', 2, 7),
('C702', 2, 7),
('C703', 2, 7),
('C704', 2, 7),
('C705', 2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `RESETPASS`
--

CREATE TABLE `RESETPASS` (
  `idReset` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `idTK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SLIDEQUANGCAO`
--

CREATE TABLE `SLIDEQUANGCAO` (
  `idSlide` int(11) NOT NULL,
  `hinhAnh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `SLIDEQUANGCAO`
--

INSERT INTO `SLIDEQUANGCAO` (`idSlide`, `hinhAnh`) VALUES
(1, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_01.jpg?alt=media&token=9dabf8c8-9dff-4132-945a-199a10147784'),
(2, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_02.jpg?alt=media&token=2652aed7-4ca3-4700-97a8-406a435c84f2'),
(3, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_03.jpg?alt=media&token=7bf1fd7c-919f-4149-8dac-3a8a62b57549'),
(4, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_04.jpg?alt=media&token=1f23f7ad-4c4b-4126-b002-460fac0f35ef'),
(5, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_05.jpg?alt=media&token=bb3319d6-3747-4855-82be-20df70313efb'),
(6, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_06.jpg?alt=media&token=5b2cdba0-54ec-4170-861f-4914f5206608'),
(7, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_07.jpg?alt=media&token=7b93f6a9-3408-4536-9394-87fe2f54a045'),
(8, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_08.jpg?alt=media&token=ba97dcc9-3619-4044-8ad9-c54cce6cedcc'),
(9, 'https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_09.jpg?alt=media&token=f1b84dbe-5572-419a-bdbd-f128f91d3164');

-- --------------------------------------------------------

--
-- Table structure for table `TAIKHOAN`
--

CREATE TABLE `TAIKHOAN` (
  `idTK` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'NULL: Khi Loại tài khoản: 1',
  `displayName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(10) COLLATE utf8_unicode_ci DEFAULT 'Mr.',
  `loaiTaiKhoan` int(11) NOT NULL COMMENT '1: social acc, 2: local cus, 3: local admin',
  `idAdmin` int(11) DEFAULT NULL,
  `idKHD` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `TAIKHOAN`
--

INSERT INTO `TAIKHOAN` (`idTK`, `email`, `password`, `displayName`, `title`, `loaiTaiKhoan`, `idAdmin`, `idKHD`) VALUES
(1, 'uyphu4@gmail.com', '$2b$10$kTih/jMWyq5uzw8lOH.rvOEw83Im1Ra/fflwfkDJ0LoY04zfP7OHG', 'Phu', 'Mr', 2, NULL, 5),
(2, 'van.trinhkhai1801@gmail.com', '$2b$10$KQZ9dlwp617BpcB22RnJjuPgiAt4GV7QxVStChOALIiVdaRgAPP7G', 'Hiraki Bun', NULL, 2, NULL, 7),
(4, 'tuankiet97@gmail.com', '$2b$10$0BtiEausSnGLmfoIU9hu0.iPWawlOAa3oRIWtBnALrhTRexIYvANC', 'Tuan Kiet', 'Mr', 2, NULL, 10),
(7, 'hanquocadrian@gmail.com', '$2b$10$Mbf06VG9e5TfzNc6Lcdzm.15LuPgCIiGR8x1vzOqvHUv.J2Wud3/a', 'Hung', 'Mr', 2, NULL, 13),
(9, 'hanquoc123@gmail.com', '$2b$10$PZR5tY5S5ELmH9toxkpDauvLUTw7GLjujCPwFTv2GIt//rZOhhfXS', 'Hung Adrian', 'Mr', 2, NULL, 21),
(10, 'hanquoc345@gmail.com', '$2b$10$OB1qjnvp/F.WcZYHNFQW.eOVosDGpjR3cysLVLwBmfrYwoxT740XS', 'Hung', NULL, 2, NULL, 23),
(11, 'tuankiet@gmail.com', '$2b$10$/JjM9nneUovRRNWQLNqoJelyxsTpV.z4R83Mmy9G3oG949edRKufS', 'Kiet', 'Mr', 2, NULL, 24),
(12, 'petertri4@gmail.com', '$2b$10$wBVU.3Q92Nh0D0dhGxkCa.Rqr.3XTStgQvi.le.TQ6jaMXEkFNlXS', 'Trieu Phu', NULL, 2, NULL, 34),
(16, 'uyphu213@gmail.com', '$2b$10$0CMOtq569CK7CvKv.VRKweidP0Esjx/lG3IbYXCavOIGHxaK85GSe', 'James Corden', 'Mr', 2, NULL, 55),
(17, 'trangkool@gmail.com', '$2b$10$T6A/bq.NuvU/Pq5EK2cd5.RzZNViddr1lDvHRSz5T4xxmD7diHsIS', 'Trang Tran', NULL, 3, 3, NULL),
(19, 'uyphu41@gmail.com', '$2b$10$hADGqCQ/h4XLZzR3h/aeCepgfx7WAz52szrCw2G5B9tPa71pnEm2C', 'Phu Trieu', NULL, 3, 5, NULL),
(20, 'tranvanhung@gmail.com', '$2b$10$5y.2MxnN3mNk9ZjAHyQ8M.l0oeWDsKfhUMA/CI6oMf5mxbBArBQQa', 'Van Hung', NULL, 3, 6, NULL),
(26, 'hanquocadria@gmail.com', NULL, 'Hung Hanquoc', NULL, 1, NULL, 56),
(27, 'quochungtran3@gmail.com', NULL, 'Adrian Chan', NULL, 1, NULL, 57),
(28, 'quochungtran321@gmail.com', NULL, 'Gaemoon Adrian', 'Mr', 1, NULL, 130),
(29, 'tuankietdam1997@gmail.com', '$2b$10$lde3QAHOvbwXza4KKVh7l.0INz0hRvom7RsRHcPJe2QNZeH7N02vm', 'Tuan Kiet 97', NULL, 3, 7, NULL),
(38, 'hung.dh51700402@gmail.com', NULL, 'Quốc Hùng Trần', NULL, 1, NULL, 216);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ADMIN`
--
ALTER TABLE `ADMIN`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indexes for table `CHITIETDATDICHVU`
--
ALTER TABLE `CHITIETDATDICHVU`
  ADD PRIMARY KEY (`idCTDDV`),
  ADD UNIQUE KEY `idDDP_2` (`idDDV`,`idDV`),
  ADD KEY `idDDP` (`idDDV`),
  ADD KEY `idDV` (`idDV`);

--
-- Indexes for table `CHITIETDONDATPHONG`
--
ALTER TABLE `CHITIETDONDATPHONG`
  ADD PRIMARY KEY (`idCTDDP`),
  ADD UNIQUE KEY `idDDP_2` (`idDDP`,`idLP`) USING BTREE,
  ADD KEY `idDDP` (`idDDP`),
  ADD KEY `idLP` (`idLP`);

--
-- Indexes for table `CHITIETPHIEUTHANHTOAN`
--
ALTER TABLE `CHITIETPHIEUTHANHTOAN`
  ADD PRIMARY KEY (`idCTPTT`),
  ADD UNIQUE KEY `idPTT_2` (`idPTT`,`maPhong`),
  ADD KEY `maPhong` (`maPhong`),
  ADD KEY `idPTT` (`idPTT`);

--
-- Indexes for table `DICHVU`
--
ALTER TABLE `DICHVU`
  ADD PRIMARY KEY (`idDV`);

--
-- Indexes for table `DONDATDICHVU`
--
ALTER TABLE `DONDATDICHVU`
  ADD PRIMARY KEY (`idDDDV`),
  ADD KEY `idKHD` (`idKHD`),
  ADD KEY `idPTP` (`idPTP`);

--
-- Indexes for table `DONDATPHONG`
--
ALTER TABLE `DONDATPHONG`
  ADD PRIMARY KEY (`idDDP`),
  ADD KEY `idKHD` (`idKHD`);

--
-- Indexes for table `GIATHEONGAY`
--
ALTER TABLE `GIATHEONGAY`
  ADD PRIMARY KEY (`idGTN`),
  ADD UNIQUE KEY `ngayBatDau` (`ngayBatDau`,`idLP`),
  ADD KEY `idLP` (`idLP`);

--
-- Indexes for table `GIATHEOTHU`
--
ALTER TABLE `GIATHEOTHU`
  ADD PRIMARY KEY (`idGTT`),
  ADD UNIQUE KEY `idGTN_2` (`idGTN`,`thu`),
  ADD KEY `idGTN` (`idGTN`);

--
-- Indexes for table `HINHANHDICHVU`
--
ALTER TABLE `HINHANHDICHVU`
  ADD PRIMARY KEY (`idHinhDV`),
  ADD KEY `idDV` (`idDV`);

--
-- Indexes for table `HINHANHLOAIPHONG`
--
ALTER TABLE `HINHANHLOAIPHONG`
  ADD PRIMARY KEY (`idHinhLP`),
  ADD KEY `idLP` (`idLP`);

--
-- Indexes for table `KHACHHANGDAT`
--
ALTER TABLE `KHACHHANGDAT`
  ADD PRIMARY KEY (`idKHD`),
  ADD UNIQUE KEY `CMND` (`CMND`),
  ADD UNIQUE KEY `Passport` (`Passport`);

--
-- Indexes for table `KHACHHANGO`
--
ALTER TABLE `KHACHHANGO`
  ADD PRIMARY KEY (`idKHO`),
  ADD UNIQUE KEY `CMND` (`CMND`),
  ADD UNIQUE KEY `Passport` (`Passport`),
  ADD UNIQUE KEY `sdt` (`sdt`);

--
-- Indexes for table `KHUYENMAI`
--
ALTER TABLE `KHUYENMAI`
  ADD PRIMARY KEY (`idKM`);

--
-- Indexes for table `LOAIPHONG`
--
ALTER TABLE `LOAIPHONG`
  ADD PRIMARY KEY (`idLP`);

--
-- Indexes for table `PHIEUTHANHTOANPHONG`
--
ALTER TABLE `PHIEUTHANHTOANPHONG`
  ADD PRIMARY KEY (`idPTT`),
  ADD KEY `idKHD` (`idKHD`),
  ADD KEY `idDDP` (`idDDP`),
  ADD KEY `idKM` (`idKM`);

--
-- Indexes for table `PHIEUTHUEPHONG`
--
ALTER TABLE `PHIEUTHUEPHONG`
  ADD PRIMARY KEY (`idPTP`),
  ADD UNIQUE KEY `idDDP_2` (`idDDP`,`maPhong`,`idKHO`),
  ADD KEY `maPhong` (`maPhong`),
  ADD KEY `idDDP` (`idDDP`),
  ADD KEY `idKHO` (`idKHO`);

--
-- Indexes for table `PHONG`
--
ALTER TABLE `PHONG`
  ADD PRIMARY KEY (`maPhong`),
  ADD KEY `idLP` (`idLP`);

--
-- Indexes for table `RESETPASS`
--
ALTER TABLE `RESETPASS`
  ADD PRIMARY KEY (`idReset`),
  ADD KEY `idTK` (`idTK`);

--
-- Indexes for table `SLIDEQUANGCAO`
--
ALTER TABLE `SLIDEQUANGCAO`
  ADD PRIMARY KEY (`idSlide`);

--
-- Indexes for table `TAIKHOAN`
--
ALTER TABLE `TAIKHOAN`
  ADD PRIMARY KEY (`idTK`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idAdmin` (`idAdmin`),
  ADD KEY `idKHD` (`idKHD`),
  ADD KEY `loaiTaiKhoan` (`loaiTaiKhoan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ADMIN`
--
ALTER TABLE `ADMIN`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `CHITIETDATDICHVU`
--
ALTER TABLE `CHITIETDATDICHVU`
  MODIFY `idCTDDV` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CHITIETDONDATPHONG`
--
ALTER TABLE `CHITIETDONDATPHONG`
  MODIFY `idCTDDP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `CHITIETPHIEUTHANHTOAN`
--
ALTER TABLE `CHITIETPHIEUTHANHTOAN`
  MODIFY `idCTPTT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `DICHVU`
--
ALTER TABLE `DICHVU`
  MODIFY `idDV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `DONDATDICHVU`
--
ALTER TABLE `DONDATDICHVU`
  MODIFY `idDDDV` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DONDATPHONG`
--
ALTER TABLE `DONDATPHONG`
  MODIFY `idDDP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `GIATHEONGAY`
--
ALTER TABLE `GIATHEONGAY`
  MODIFY `idGTN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `GIATHEOTHU`
--
ALTER TABLE `GIATHEOTHU`
  MODIFY `idGTT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `HINHANHDICHVU`
--
ALTER TABLE `HINHANHDICHVU`
  MODIFY `idHinhDV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `HINHANHLOAIPHONG`
--
ALTER TABLE `HINHANHLOAIPHONG`
  MODIFY `idHinhLP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `KHACHHANGDAT`
--
ALTER TABLE `KHACHHANGDAT`
  MODIFY `idKHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT for table `KHACHHANGO`
--
ALTER TABLE `KHACHHANGO`
  MODIFY `idKHO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `KHUYENMAI`
--
ALTER TABLE `KHUYENMAI`
  MODIFY `idKM` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `LOAIPHONG`
--
ALTER TABLE `LOAIPHONG`
  MODIFY `idLP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `PHIEUTHANHTOANPHONG`
--
ALTER TABLE `PHIEUTHANHTOANPHONG`
  MODIFY `idPTT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `PHIEUTHUEPHONG`
--
ALTER TABLE `PHIEUTHUEPHONG`
  MODIFY `idPTP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `RESETPASS`
--
ALTER TABLE `RESETPASS`
  MODIFY `idReset` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SLIDEQUANGCAO`
--
ALTER TABLE `SLIDEQUANGCAO`
  MODIFY `idSlide` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `TAIKHOAN`
--
ALTER TABLE `TAIKHOAN`
  MODIFY `idTK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CHITIETDATDICHVU`
--
ALTER TABLE `CHITIETDATDICHVU`
  ADD CONSTRAINT `CHITIETDATDICHVU_ibfk_1` FOREIGN KEY (`idDDV`) REFERENCES `DONDATDICHVU` (`idDDDV`) ON UPDATE CASCADE,
  ADD CONSTRAINT `chitietdatdichvu_ibfk_2` FOREIGN KEY (`idDV`) REFERENCES `DICHVU` (`idDV`) ON UPDATE CASCADE;

--
-- Constraints for table `CHITIETDONDATPHONG`
--
ALTER TABLE `CHITIETDONDATPHONG`
  ADD CONSTRAINT `chitietdondatphong_ibfk_2` FOREIGN KEY (`idDDP`) REFERENCES `DONDATPHONG` (`idDDP`) ON UPDATE CASCADE,
  ADD CONSTRAINT `chitietdondatphong_ibfk_3` FOREIGN KEY (`idLP`) REFERENCES `LOAIPHONG` (`idLP`);

--
-- Constraints for table `CHITIETPHIEUTHANHTOAN`
--
ALTER TABLE `CHITIETPHIEUTHANHTOAN`
  ADD CONSTRAINT `CHITIETPHIEUTHANHTOAN_ibfk_1` FOREIGN KEY (`idPTT`) REFERENCES `PHIEUTHANHTOANPHONG` (`idPTT`) ON UPDATE CASCADE,
  ADD CONSTRAINT `CHITIETPHIEUTHANHTOAN_ibfk_2` FOREIGN KEY (`maPhong`) REFERENCES `PHONG` (`maPhong`) ON UPDATE CASCADE;

--
-- Constraints for table `DONDATDICHVU`
--
ALTER TABLE `DONDATDICHVU`
  ADD CONSTRAINT `DONDATDICHVU_ibfk_1` FOREIGN KEY (`idKHD`) REFERENCES `KHACHHANGDAT` (`idKHD`) ON UPDATE CASCADE,
  ADD CONSTRAINT `DONDATDICHVU_ibfk_4` FOREIGN KEY (`idPTP`) REFERENCES `PHIEUTHUEPHONG` (`idPTP`) ON UPDATE CASCADE;

--
-- Constraints for table `DONDATPHONG`
--
ALTER TABLE `DONDATPHONG`
  ADD CONSTRAINT `dondatphong_ibfk_1` FOREIGN KEY (`idKHD`) REFERENCES `KHACHHANGDAT` (`idKHD`) ON UPDATE CASCADE;

--
-- Constraints for table `GIATHEONGAY`
--
ALTER TABLE `GIATHEONGAY`
  ADD CONSTRAINT `giatheongay_ibfk_1` FOREIGN KEY (`idLP`) REFERENCES `LOAIPHONG` (`idLP`) ON UPDATE CASCADE;

--
-- Constraints for table `GIATHEOTHU`
--
ALTER TABLE `GIATHEOTHU`
  ADD CONSTRAINT `giatheothu_ibfk_1` FOREIGN KEY (`idGTN`) REFERENCES `GIATHEONGAY` (`idGTN`) ON UPDATE CASCADE;

--
-- Constraints for table `HINHANHDICHVU`
--
ALTER TABLE `HINHANHDICHVU`
  ADD CONSTRAINT `hinhanhdichvu_ibfk_1` FOREIGN KEY (`idDV`) REFERENCES `DICHVU` (`idDV`) ON UPDATE CASCADE;

--
-- Constraints for table `HINHANHLOAIPHONG`
--
ALTER TABLE `HINHANHLOAIPHONG`
  ADD CONSTRAINT `hinhanhphong_ibfk_1` FOREIGN KEY (`idLP`) REFERENCES `LOAIPHONG` (`idLP`) ON UPDATE CASCADE;

--
-- Constraints for table `PHIEUTHANHTOANPHONG`
--
ALTER TABLE `PHIEUTHANHTOANPHONG`
  ADD CONSTRAINT `PHIEUTHANHTOANPHONG_ibfk_1` FOREIGN KEY (`idDDP`) REFERENCES `DONDATPHONG` (`idDDP`) ON UPDATE CASCADE,
  ADD CONSTRAINT `PHIEUTHANHTOANPHONG_ibfk_2` FOREIGN KEY (`idKHD`) REFERENCES `KHACHHANGDAT` (`idKHD`) ON UPDATE CASCADE,
  ADD CONSTRAINT `PHIEUTHANHTOANPHONG_ibfk_3` FOREIGN KEY (`idKM`) REFERENCES `KHUYENMAI` (`idKM`) ON UPDATE CASCADE;

--
-- Constraints for table `PHIEUTHUEPHONG`
--
ALTER TABLE `PHIEUTHUEPHONG`
  ADD CONSTRAINT `phieuthuephong_ibfk_1` FOREIGN KEY (`idDDP`) REFERENCES `DONDATPHONG` (`idDDP`) ON UPDATE CASCADE,
  ADD CONSTRAINT `phieuthuephong_ibfk_2` FOREIGN KEY (`idKHO`) REFERENCES `KHACHHANGO` (`idKHO`) ON UPDATE CASCADE,
  ADD CONSTRAINT `phieuthuephong_ibfk_3` FOREIGN KEY (`maPhong`) REFERENCES `PHONG` (`maPhong`) ON UPDATE CASCADE;

--
-- Constraints for table `PHONG`
--
ALTER TABLE `PHONG`
  ADD CONSTRAINT `phong_ibfk_1` FOREIGN KEY (`idLP`) REFERENCES `LOAIPHONG` (`idLP`) ON UPDATE CASCADE;

--
-- Constraints for table `RESETPASS`
--
ALTER TABLE `RESETPASS`
  ADD CONSTRAINT `RESETPASS_ibfk_1` FOREIGN KEY (`idTK`) REFERENCES `TAIKHOAN` (`idTK`) ON UPDATE CASCADE;

--
-- Constraints for table `TAIKHOAN`
--
ALTER TABLE `TAIKHOAN`
  ADD CONSTRAINT `TAIKHOAN_ibfk_1` FOREIGN KEY (`idKHD`) REFERENCES `KHACHHANGDAT` (`idKHD`) ON UPDATE CASCADE,
  ADD CONSTRAINT `TAIKHOAN_ibfk_2` FOREIGN KEY (`idAdmin`) REFERENCES `ADMIN` (`idAdmin`) ON UPDATE CASCADE;
