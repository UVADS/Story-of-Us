<template>
  <div>
    <ChromePageHeader />
    <div class="page-content">
      <p>
        The Story of Us is a digital brand showcase that chronicles the creation
        of a data science school at the University of Virginia. From an idea to
        an institute, and now to the first school of its kind in the nation,
        this bespoke, interactive website tells the story through written and
        spoken narrative supported by multimedia, archival documentation, and
        testimony from a diversity of voices. The result is a unique brand piece
        that combines technology with art, a retrospective of one school’s past
        and how it will inform its future. It was commissioned by the School of
        Data Science to mark the opening of its new building in April 2024.
      </p>
      <p>
        The Story of Us website was built by John Baxton, senior web developer
        for the School of Data Science, who worked in close collaboration with
        Sue Haas, the School’s information technology director. The designs for
        the site were created by the Charlottesville-based Journey Group. Video
        interviews and the audio version of The Story of Us were recorded and
        edited by Cody Huff, multimedia producer for the School of Data Science,
        who also coordinated the curation of assets for the project. Monica
        Manney provided the narration.
      </p>
      <p>
        Research and editorial content for the project were provided by the
        School of Data Science communications team of Huff, Cooper Allen, Alyssa
        Brown, Emma Candelier, and Kirsten Samuels.
      </p>
      <p>
        The Story of Us would not have been possible without the cooperation and
        generous time provided by the key figures interviewed for this project.
        They are Cathy Anderson, Phil Bourne, Don Brown, Arlyn Burgess, Rick
        Horwitz, Reggie Leonard, Melissa Phillips, Jim Ryan, Teresa Sullivan,
        and Jaffray Woodriff.
      </p>
      <p>
        And to all the students, faculty, and staff who contributed to this
        story over the years, the School of Data Science will forever be
        grateful.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.page-content {
  padding: 2rem 0 60px;
  max-width: 960px;
  line-height: 1.625;
  font-size: 18px;

  @media (min-width: 700px) {
    font-size: 20px;
  }

  @media (min-width: 800px) {
    font-size: 22px;
  }
}
.main-content {
  max-width: 1200px;
}
p {
  padding-bottom: 20px;
}
</style>
