/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    angular
        .module('app.core')
        .factory('S3Service', function(s3options) {

            function getS3ActiveImageUrl(condoId, itemId, imgName) {
                var urlHost = 'https://s3-' + s3options.region + '.amazonaws.com';
                var urlPath = "/" + s3options.bucket + "/images/" + condoId + "/" + itemId + "/" + imgName;
                return urlHost + urlPath;
            }

            function getS3ActiveImageThumbnailUrl(condoId, itemId, imgName) {
                var urlHost = 'https://s3-' + s3options.region + '.amazonaws.com';
                var finalImgName = imgName.slice(0, imgName.lastIndexOf(".")) + "_200x200." + getFileExtension(imgName);

                var urlPath = "/" + s3options.bucket + "/images/" + condoId + "/" + itemId + "/" + finalImgName;
                return urlHost + urlPath;
            }

            function getS3PendingImageUrl(itemId, imgName) {
                var urlHost = 'https://s3-' + s3options.region + '.amazonaws.com';
                var urlPath = "/" + s3options.bucket + "/images/items_temp/" + itemId + "/" + imgName;
                return urlHost + urlPath;
            }
            function getS3PendingImageThumbnailUrl(itemId, imgName) {
              var urlHost = 'https://s3-' + s3options.region + '.amazonaws.com';
              var finalImgName = imgName.slice(0, imgName.lastIndexOf(".")) + "_200x200." + getFileExtension(imgName);

              var urlPath = "/" + s3options.bucket + "/images/items_temp/" + itemId + "/" + finalImgName;
              return urlHost + urlPath;
            }

            function getFileExtension(filename) {
                return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
            }

            return {
                getS3ActiveImageUrl: getS3ActiveImageUrl,
                getS3ActiveImageThumbnailUrl: getS3ActiveImageThumbnailUrl,
                getS3PendingImageUrl: getS3PendingImageUrl,
                getS3PendingImageThumbnailUrl: getS3PendingImageThumbnailUrl
            };
        });
})();
